// import connection of sequelizeconsole
// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('../db/db');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require('sequelize');

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Connection re-synced');
  })
  .catch((err) => {
    console.log('Error on re-synced', err);
  });

// eslint-disable-next-line @typescript-eslint/no-var-requires
db.user = require('../models/user/user')(db.sequelize, DataTypes);

// eslint-disable-next-line @typescript-eslint/no-var-requires
// db.Hotel = require('../models/hotel/hotel')(db.sequelize, DataTypes);
db.recharge = require('../models/recharge/recharge')(db.sequelize, DataTypes);
db.lost_history = require('../models/lost_history/lost_history')(
  db.sequelize,
  DataTypes,
);
//adding utsho
db.cardtbl = require('../models/cardtbl/cardtbl')(db.sequelize, DataTypes);
db.usagetbl = require('../models/usagetbl/usagetbl')(db.sequelize, DataTypes);

// conection
db.cardtbl.hasMany(db.recharge, { foreignkey: 'card_id' });
db.recharge.belongsTo(db.cardtbl, { foreignkey: 'card_id' });

//user table with card tbl
db.cardtbl.hasOne(db.lost_history, { foreignkey: 'card_id' });
db.lost_history.belongsTo(db.cardtbl, { foreignkey: 'card_id' });

db.user.hasMany(db.cardtbl, { foreignkey: 'user_id' });
db.cardtbl.belongsTo(db.user, { foreignkey: 'user_id' });

db.user.hasMany(db.lost_history, { foreignkey: 'user_id' });
db.lost_history.belongsTo(db.user, { foreignkey: 'user_id' });

db.cardtbl.hasMany(db.usagetbl, { foreignkey: 'card_id' });
db.usagetbl.belongsTo(db.cardtbl, { foreignkey: 'card_id' });
// export
module.exports = db;
