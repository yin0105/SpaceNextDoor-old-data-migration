const { newModels, newDB } = require('../sequelize');

(async () => {
  const types = [
    { name: '1000 Coverage', covered_amount: 1000, price_per_day: 0.1 },
    { name: '2000 Coverage', covered_amount: 2000, price_per_day: 0.2 },
    { name: '3000 Coverage', covered_amount: 3000, price_per_day: 0.3 },
    { name: '4000 Coverage', covered_amount: 4000, price_per_day: 0.4 },
    { name: '5000 Coverage', covered_amount: 5000, price_per_day: 0.5 },
  ];

  console.log(`[i] Adding platform insurances...`);
  const country = await newModels.countries.findOne({where: { code: 'SGP' }});

  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    await newModels.platform_insurances.create({
      name_en: type.name,
      name_th: type.name,
      name_kr: type.name,
      name_jp: type.name,
      country_id: country.id,
      third_party_provider: 'n/a',
      covered_amount: type.covered_amount,
      price_per_day: type.price_per_day,
    })
  }
  console.log(`[i] All done...`);
  process.exit(1);
})();