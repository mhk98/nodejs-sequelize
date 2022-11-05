// import connection of sequelizeconsole
// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('../db/db');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require('sequelize');

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Connection re-synced');
  })
  .catch((err) => {
    console.log('Error on re-synced', err);
  });

// eslint-disable-next-line @typescript-eslint/no-var-requires
db.user = require('../models/user/user')(db.sequelize, DataTypes, db.Sequelize);

// eslint-disable-next-line @typescript-eslint/no-var-requires
// db.Hotel = require('../models/hotel/hotel')(db.sequelize, DataTypes);
db.recharge = require('../models/recharge/recharge')(db.sequelize, DataTypes);
db.lost_history = require('../models/lost_history/lost_history')(
  db.sequelize,
  DataTypes,
);
// export
module.exports = db;
