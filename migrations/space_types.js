const { newModels, newDB } = require('../sequelize');

(async () => {
  const types = [
    {name: 'XXS', size_from: 0, size_to: 16, unit: 'sqft', },
    {name: 'XS', size_from: 17, size_to: 25, unit: 'sqft', },
    {name: 'S', size_from: 26, size_to: 50, unit: 'sqft', },
    {name: 'M', size_from: 51, size_to: 100, unit: 'sqft', },
    {name: 'L', size_from: 101, size_to: 200, unit: 'sqft', },
    {name: 'XL', size_from: 201, size_to: 300, unit: 'sqft', },
    {name: 'XXL', size_from: 301, size_to: 1000, unit: 'sqft', },
  ];

  console.log(`[i] Adding platform space types...`);
  const country = await newModels.countries.findOne({where: { code: 'SGP' }});

  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    await newModels.platform_space_types.create({
      name_en: type.name,
      name_th: type.name,
      name_kr: type.name,
      name_jp: type.name,
      size_from: type.size_from,
      size_to: type.size_to,
      size: type.size_to,
      unit: type.unit,
      country_id: country.id,
      slug: type.name.toUpperCase(),
    })
  }
})();