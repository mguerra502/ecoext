const { Sequelize } = require('sequelize');
const {
  ECOEXT_MYSQL_PORT,
  ECOEXT_MYSQL_HOST,
  ECOEXT_DATABASE,
  ECOEXT_DATABASE_USER,
  ECOEXT_DATABASE_ROOTPASSWORD
} = require("./utils/config")

// let HOST     = process.env.os == "Windows_NT" ? "localhost" : process.env.ECOEXT_MYSQL_HOST;
// let DATABASE = process.env.os == "Windows_NT" ? "ecoext" : process.env.ECOEXT_DATABASE;
// let USERNAME = process.env.os == "Windows_NT" ? "gabriel" : process.env.ECOEXT_DATABASE_USER;
// let PASSWORD = process.env.os == "Windows_NT" ? "eueeu99" : process.env.ECOEXT_DATABASE_ROOTPASSWORD;

// const Conn = new Sequelize(
//   {
//     host: HOST,
//     database: DATABASE,
//     username: USERNAME,
//     password: PASSWORD,
//     dialect: 'mysql',
//     port: ECOEXT_MYSQL_PORT
//   }
// );
const Conn = new Sequelize(
  {
    host: ECOEXT_MYSQL_HOST,
    database: ECOEXT_DATABASE,
    username: ECOEXT_DATABASE_USER,
    password: ECOEXT_DATABASE_ROOTPASSWORD,
    dialect: 'mysql',
    port: ECOEXT_MYSQL_PORT
  }
);

const Purse                         = Conn.import(__dirname + "/db/schema/Purse")
const Account                       = Conn.import(__dirname + "/db/schema/Account")
const AccountPurses                 = Conn.import(__dirname + "/db/schema/AccountPurses")

const AccountNotifications          = Conn.import(__dirname + "/db/schema/AccountNotifications")
const AccountTransactions          = Conn.import(__dirname + "/db/schema/AccountTransactions")

const Establishment                 = Conn.import(__dirname + "/db/schema/Establishment")

const Transaction                   = Conn.import(__dirname + "/db/schema/Transaction")
const TransactionItems              = Conn.import(__dirname + "/db/schema/TransactionItems")

// 
const TransactionNotifications      = Conn.import(__dirname + "/db/schema/TransactionNotifications")
// 

// 
const PurseTransactions             = Conn.import(__dirname + "/db/schema/PurseTransaction")
// 

const Notification                  = Conn.import(__dirname + "/db/schema/Notification")

Account.belongsToMany(Notification, {through: AccountNotifications, foreignKey: 'account_id'});
Notification.belongsToMany(Account, {through: AccountNotifications, foreignKey: 'notification_id'});

Transaction.belongsToMany(Notification, {through: TransactionNotifications, foreignKey: 'transaction_id'});
Notification.belongsToMany(Transaction, {through: TransactionNotifications, foreignKey: 'notification_id'});

Transaction.hasMany(TransactionItems, {as: 'TransactionItems', foreignKey: 'transaction_id'});

Account.belongsToMany(Purse, {through: AccountPurses, foreignKey: 'account_id'});
Purse.belongsToMany(Account, {through: AccountPurses, foreignKey: 'purse_id'});

//Account transaction
// Account.belongsToMany(Transaction, {through: AccountTransactions, foreignKey: 'account_id'});
// Transaction.belongsToMany(Account, {through: AccountTransactions, foreignKey: 'transaction_id'});

//Account transaction
Purse.belongsToMany(Transaction, {through: PurseTransactions, foreignKey: 'purse_id'});
Transaction.belongsToMany(Purse, {through: PurseTransactions, foreignKey: 'transaction_id'});

module.exports = Conn;