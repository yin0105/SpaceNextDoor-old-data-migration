const { newModels, newDB } = require('../sequelize');

(async () => {
  const spaceFeatures = [
    {name: 'Locker', id: 15},
    {name: 'Cupboard', id: 25},
    {name: 'Racking shelf', id: 35},
    {name: 'Part room', id: 45},
    {name: 'Floor space', id: 55},
    {name: 'Entire room', id: 65},
    {name: 'Unit', id: 75},
    {name: 'Wine cellar', id: 85},
  ];

  const siteFeatures = [
    {name: 'Air con', id: 10},
    {name: '24 hours access', id: 20},
    {name: 'Lift access', id: 30},
    {name: 'Security', id: 40},
    {name: 'Loading dock', id: 50},
    {name: 'CCTV', id: 60},
    {name: 'Lockable doors', id: 70},
    {name: 'On Site staff', id: 80},
    {name: 'Free parking', id: 90},
    {name: 'Trollyes', id: 100},
    {name: 'Step ladder', id: 110},
    {name: 'Racking/Shelving', id: 120},
    {name: 'Sprinkler', id: 130},
    {name: 'Power supply', id: 140},
    {name: 'WIFI', id: 150},
  ];
  const propertyTypes = [
    {name: 'Residential', id: 1},
    {name: 'Commercial', id: 2},
    {name: 'Industrial', id: 3},
  ];

  console.log(`************** Features *****************`);

  const t = await newDB.transaction();

  try {
    console.log(`[i] Adding category...`);
    const category = await newModels.platform_feature_categories.create({
      name_en: 'General',
      name_th: 'General',
      name_jp: 'General',
      name_kr: 'General',
    }, { transaction: t });
    
    for (let i = 0; i < siteFeatures.length; i++) {
      const feat = siteFeatures[i];
      console.log(`[i] Adding site feature ${feat.name}...`);
      await newModels.platform_features.create({
        id: feat.id,
        name_en: feat.name,
        name_th: feat.name,
        name_kr: feat.name,
        name_jp: feat.name,
        type: 'SITE',
        is_active: true,
        category_id: category.id,
      }, { transaction: t });
    }

    for (let i = 0; i < spaceFeatures.length; i++) {
      const feat = spaceFeatures[i];
      console.log(`[i] Adding space feature ${feat.name}...`);
      await newModels.platform_features.create({
        id: feat.id,
        name_en: feat.name,
        name_th: feat.name,
        name_kr: feat.name,
        name_jp: feat.name,
        type: 'SPACE',
        is_active: true,
        category_id: category.id,
      }, { transaction: t });
    }

    console.log(`[i] Committing transaction....`);
    t.commit();
    console.log(`[i] All done successfully!`);
  } catch (e) {
    console.log(`[e] Error occurred while adding features!`, e.message)
    console.log(e);
    t.rollback()
  }

  console.log(`************** Property Types *****************`);

  try {
    for (let i = 0; i < propertyTypes.length; i++) {
      const feat = propertyTypes[i];
      console.log(`[i] Adding property type ${feat.name}...`);
      await newModels.platform_property_types.create({
        id: feat.id,
        name_en: feat.name,
        name_th: feat.name,
        name_kr: feat.name,
        name_jp: feat.name,
      });
    }
  } catch (e) {
    console.log(`[e] Error occurred while adding property types!`, e.message)
  }

  console.log(`************** Platform Commission *****************`);

  try {
    console.log(`[i] Adding commission...`);
    await newModels.platform_commissions.create({
      slug: 'DEFAULT_COMMISSION',
      percentage: 15,
    });
  } catch (e) {
    console.log(`[e] Error occurred while adding commission types!`, e.message)
  }

  console.log(`[i] All done successfully!`);
})();