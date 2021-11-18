const { newDB, newModels } = require('../sequelize.js');
const {readSync} = require('node-yaml');

const cities = readSync('../districts.yml').SGP.cities;

const districtCodesObj = cities.SGP.areas;
const districtsLatLngObj = cities.SGP.latlng;


const getDistricts = (cityId) => {
  const districts = [];
  Object.keys(districtCodesObj).forEach((key) => {
    const name = districtCodesObj[key].name;
    const lat = districtsLatLngObj[name].latitude;
    const lng = districtsLatLngObj[name].longitude;

    districts.push({
      name_en: name,
      name_th: name,
      name_jp: name,
      name_kr: name,
      old_district_code: `SGP-SGP-${key}`,
      city_id: cityId,
      location: {
        coordinates: [lng, lat],
        type: 'Point',
      },
    });
  });

  return districts;
}
(async () => {
  const t = await newDB.transaction();
  try {
    const queryInterface = newDB.getQueryInterface();
    const cols = await queryInterface.describeTable('districts');
    if (!cols.old_district_code) {
      console.log('[i] Trying to add [old_district_code] column in [districts] table.....');
      await newDB.query('ALTER TABLE districts ADD COLUMN old_district_code VARCHAR(50);', { transaction: t })
    }
    if (!cols.location) {
      console.log('[i] Trying to add [location] column in [districts] table.....');
      await newDB.query('ALTER TABLE districts ADD COLUMN location geometry(Point,0);', { transaction: t })
    }
    console.log('[i] Adding Singapore country....');
    const country = await newModels.countries.create({
      name_en: 'Singapore',
      name_th: 'Singapore',
      name_jp: 'Singapore',
      name_kr: 'Singapore',
      code: 'SGP',
      currency: 'SGD',
      currency_sign: 'S$',
    }, { transaction: t });
    console.log('[i] Adding Singapore city....');
    const city = await newModels.cities.create({
      name_en: 'Singapore',
      name_th: 'Singapore',
      name_jp: 'Singapore',
      name_kr: 'Singapore',
      code: 'SGP',
      country_id: country.id,
    }, { transaction: t });

    const districtsArr = getDistricts(city.id);

    for (let i = 0; i < districtsArr.length; i++) {
      const district = districtsArr[i];
      console.log(`[i] Adding ${district.name_en} district....`);
      await newModels.districts.create(district, { transaction: t });
    }

    console.log('[i] Committing transaction....');
    await t.commit();

    console.log('[i] All done successfully!');
  } catch (e) {
    console.log(`[e] Error occurred while running migration for districts`, e.message);
    await t.rollback();
  }
})();