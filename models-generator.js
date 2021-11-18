const { SequelizeAuto } = require('sequelize-auto');
const { newDB } = require('./sequelize.js');

// const sequelize = new Sequelize('sqlite::memory:');
// const options = { caseFile: 'l', caseModel: 'p', caseProp: 'c' };

const auto = new SequelizeAuto(newDB, null, null, {
  directory: './new-models',
});
auto.run();