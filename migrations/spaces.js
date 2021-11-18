const {Op} = require('sequelize');
const lodash = require('lodash');
const { newDB, newModels, oldModels } = require('../sequelize.js');
const { groupBy } = require('lodash');

const BASE_URL = 'https://assets.spacenextdoor.com/uploads/image/image';

(async () => {
  const queryInterface = newDB.getQueryInterface();
  const cols = await queryInterface.describeTable('spaces');
  if (!cols.old_space_ids) {
    console.log('[i] Trying to add [old_space_ids] column in [spaces] table.....');
    await newDB.query('ALTER TABLE spaces ADD COLUMN old_space_ids INTEGER[];')
    console.log('[i] Added [old_space_id] column in [spaces] table successfully!');
  }
  console.log(`[i] Fetching all spaces in the old database...`);
  const spaceTypes = await newModels.platform_space_types.findAll();
  const getSpaceTypeId = (area) => (spaceTypes.filter((t) => t.size_from <= area && t.size_to >= area)[0] || {}).id;
  const activeSpaces = await oldModels.spaces.findAll({
    where: {
      user_id: {
        [Op.ne]: 114,
      },
      //activated
      status: {
        [Op.in]: [2, 3],
      }
    },
    include: [
      {model: oldModels.storages, as: 'storages'},
      {model: oldModels.images, as: 'images'},
      {model: oldModels.addresses, as: 'addresses'},
    ],
  });

  console.log(`[i] Grouping all spaces by user_id...`);
  const groupedSpacesByUser = lodash.groupBy(lodash.sortBy(activeSpaces, (s) =>  s.area * 10.764), (o) => o.user_id);
  const userIds = Object.keys(groupedSpacesByUser);
  for (let i = 0; i < userIds.length; i++) {
    console.log(` [i] Creating site for user: ${userIds[i]}...`);
    const spaces = groupedSpacesByUser[userIds[i]];
    const groupedSpacesByPrice = lodash.groupBy(spaces, (space) => space.daily_price_cents);
    if (!spaces.length) {
      continue;
    }

    // Create site for this user
    const firstSpaceAsSite = spaces[0];
    const siteImages = spaces[0].images || [];
    const [customer, district] = await Promise.all([
      newModels.users.findOne({ where: { old_user_id: firstSpaceAsSite.user_id }}),
      newModels.districts.findOne({
        where: {
          old_district_code: firstSpaceAsSite.addresses.area
        },
        include: [{model: newModels.cities, as: 'city'}],
      })
    ]);
    const siteTrans = await newDB.transaction();

    try {
      const siteAddress = {
        lat: firstSpaceAsSite.addresses.latitude,
        lng: firstSpaceAsSite.addresses.longitude,
        postal_code: firstSpaceAsSite.addresses.postal_code,
        point: {
          coordinates: [firstSpaceAsSite.addresses.longitude, firstSpaceAsSite.addresses.latitude], 
          type: 'Point',
        },
        city_id: district.city_id,
        country_id: district.city.country_id,
        district_id: district.id,
        street: firstSpaceAsSite.addresses.street_address,
        created_at: firstSpaceAsSite.addresses.created_at,
        updated_at: firstSpaceAsSite.addresses.updated_at,
      };
      console.log(`  [i] Creating address for site...`);
      const address = await newModels.site_addresses.create(siteAddress, { transaction: siteTrans });

      const siteObj = {
        name: firstSpaceAsSite.name,
        description: firstSpaceAsSite.description,
        user_id: customer.id,
        status: 'ACTIVE',
        commission_id: 1,
        provider_type: firstSpaceAsSite.storages.category === 1 ? 'BUSINESS' : 'INDIVIDUAL',
        property_type_id: firstSpaceAsSite.property + 1,
        images: siteImages.length ? [`${BASE_URL}/${siteImages[0].id}/slide_${siteImages[0].image}`] : [],
        address_id: address.id,
        is_featured: !!spaces.filter((o) => o.featured).length,
        stock_management_type: 'SND',
        created_at: firstSpaceAsSite.created_at,
        updated_at: firstSpaceAsSite.updated_at,
        created_by: customer.id,
      };

      console.log(`  [i] Creating site...`);
      const site = await newModels.sites.create(siteObj, { transaction: siteTrans });
      console.log(`  [i] Created site: ${site.id}!`);

      for (let j = 0; j < (firstSpaceAsSite.storages.facilities || []).length; j++) {
        console.log(`   [i] Creating feature ${firstSpaceAsSite.storages.facilities[j]} for site ${site.id}...`);
        await newModels.site_features.create({
          site_id: site.id,
          feature_id: firstSpaceAsSite.storages.facilities[j],
          created_at: firstSpaceAsSite.storages.created_at,
          updated_at: firstSpaceAsSite.storages.updated_at,
        }, { transaction: siteTrans })
      }

      const spacesKeys = Object.keys(groupedSpacesByPrice);

      // for each space, create space inside that site
      for (let j = 0; j < spacesKeys.length; j++) {
        const currKey = spacesKeys[j];
        const groupedSpaces = groupedSpacesByPrice[currKey];
        
        if (!groupedSpaces.length) {
          continue;
        }

        const groupedSpacesArea = groupBy(groupedSpaces, (s) => s.area);
        const keys = Object.keys(groupedSpacesArea);
        
        for (k = 0; k < keys.length; k++) {
          const groupSpacesArea = groupedSpacesArea[keys[k]];
          const space = groupSpacesArea[0];

          if (!space) {
            continue;
          }

          const isActive = groupSpacesArea.filter((s) => s.status === 2)[0];

          if (!space) {
            continue;
          }

          const spaceObj = {
            name: space.name,
            description: space.description,
            images: (space.images || []).map((img) => `${BASE_URL}/${img.id}/${img.image}`),
            status: isActive ? 'ACTIVE' : 'IN_ACTIVE',
            site_id: site.id,
            user_id: customer.id,
            size: parseFloat((space.area * 10.764).toFixed(2)),
            size_unit: 'sqft',
            platform_space_type_id: getSpaceTypeId(parseFloat(space.area * 10.764).toFixed(2)),
            height: space.height || 0,
            length: 0,
            width: space.height && space.area ? parseFloat(((space.area * 10.764) / (space.height * 100)).toFixed(1)) : 0,
            stock_management_type: 'SND',
            old_space_ids: groupSpacesArea.map((s) => s.id),
            created_by: customer.id,
            updated_at: space.updated_at,
            created_at: space.created_at,
          };
          console.log(`   [i] Creating space for site ${site.id}...`);
          const newSpace = await newModels.spaces.create(spaceObj, { transaction: siteTrans });
          const price = {
            space_id: newSpace.id,
            price_per_month: parseFloat(((space.daily_price_cents * 31) / 100).toFixed(2)),
            type: 'BASE_PRICE',
            currency: 'SGD',
            currency_sign: 'S$',
          };

          for (let j = 0; j < (space.storages.features || []).length; j++) {
            console.log(`    [i] Creating space feature for space ${newSpace.id}...`);
            await newModels.space_features.create({
              space_id: newSpace.id,
              feature_id: space.storages.features[j] + 5,
              created_at: space.storages.created_at,
              updated_at: space.storages.updated_at,
            }, { transaction: siteTrans })
          }

          console.log(`    [i] Creating price for space ${newSpace.id} of site: ${site.id}...`);
          await newModels.prices.create(price, { transaction: siteTrans });
        }

      }
      
      console.log(` [i] Committing for site: ${site.id}...`);
      await siteTrans.commit();
    } catch (e) {
      await siteTrans.rollback();
      console.log(e);
      console.log(` [i] Error occurred for creating site for user: ${userIds[i]}!`);
    }
  }
})();