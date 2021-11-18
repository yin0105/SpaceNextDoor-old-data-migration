const Sequelize = require('sequelize');
const initOldModels = require('./old-models/init-models.js');
const initNewModels = require('./new-models/init-models.js');

const OLD_DB_CONN_STR = 'postgres://fbheisobewwuvk:5a4ebbd763de37d9dd5ec13fd75e496e7bf8becaa351e245fd21be99db5ee724@ec2-107-22-250-33.compute-1.amazonaws.com/d14c3k8vocvvuk';
const NEW_DB_CONN_STR = 'postgres://snd:952vs7E3WcCKaFYf@snd-pg-dev2.cbcdhoiotoy8.ap-southeast-1.rds.amazonaws.com/snd';

if (!OLD_DB_CONN_STR || !NEW_DB_CONN_STR) {
  throw new Error('DB Connection string is null');
}

const oldDB = new Sequelize(OLD_DB_CONN_STR, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const newDB = new Sequelize(NEW_DB_CONN_STR, {
  logging: false,
})

module.exports.oldModels = initOldModels(oldDB);
module.exports.newModels = initNewModels(newDB);
module.exports.oldDB = oldDB;
module.exports.newDB = newDB;

try {
  oldDB.authenticate();
  newDB.authenticate();
} catch (e) {
  console.log(e.message);
}
