const { Sequelize } = require('sequelize');

const Conn = new Sequelize(
  {
    host: process.env.ECOEXT_MYSQL_HOST,
    database: process.env.ECOEXT_DATABASE,
    username: process.env.ECOEXT_DATABASE_USER,
    password: process.env.ECOEXT_DATABASE_ROOTPASSWORD,
    dialect: 'mysql',
    port: 3306
  }
);
    
const Purse                 = Conn.import(__dirname + "/db/schema/Purse")
const Account               = Conn.import(__dirname + "/db/schema/Account")
const AccountPurses         = Conn.import(__dirname + "/db/schema/AccountPurses")

const AccountNotifications   = Conn.import(__dirname + "/db/schema/AccountNotifications")

const Establishment         = Conn.import(__dirname + "/db/schema/Establishment")

const Transaction           = Conn.import(__dirname + "/db/schema/Transaction")
const Notification          = Conn.import(__dirname + "/db/schema/Notification")

Notification.belongsToMany

Account.belongsToMany(Notification, {through: AccountNotifications, foreignKey: 'account_id'});
Notification.belongsToMany(Account, {through: AccountNotifications, foreignKey: 'notification_id'});

Account.belongsToMany(Purse, {through: AccountPurses, foreignKey: 'account_id'});
Purse.belongsToMany(Account, {through: AccountPurses, foreignKey: 'purse_id'});

module.exports = Conn;