const { Sequelize } = require('sequelize');
const {
  ECOEXT_MYSQL_PORT,
  ECOEXT_MYSQL_HOST,
  ECOEXT_DATABASE,
  ECOEXT_DATABASE_USER,
  ECOEXT_DATABASE_ROOTPASSWORD
} = require("./utils/config")

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

const Establishment                 = Conn.import(__dirname + "/db/schema/Establishment")

const Transaction                   = Conn.import(__dirname + "/db/schema/Transaction")
const TransactionItems              = Conn.import(__dirname + "/db/schema/TransactionItems")

const TransactionNotifications      = Conn.import(__dirname + "/db/schema/TransactionNotifications")

const PurseTransactions             = Conn.import(__dirname + "/db/schema/PurseTransaction")

const Notification                  = Conn.import(__dirname + "/db/schema/Notification")

const EstablishmentPhoneNumber      = Conn.import(__dirname + "/db/schema/EstablishmentPhoneNumber")
const PhoneNumber                   = Conn.import(__dirname + "/db/schema/PhoneNumber")

const EstablishmentTransaction      = Conn.import(__dirname + "/db/schema/EstablishmentTransaction");

Account.belongsToMany(Notification, {through: AccountNotifications, foreignKey: 'account_id'});
Notification.belongsToMany(Account, {through: AccountNotifications, foreignKey: 'notification_id'});

Transaction.belongsToMany(Notification, {through: TransactionNotifications, foreignKey: 'transaction_id'});
Notification.belongsToMany(Transaction, {through: TransactionNotifications, foreignKey: 'notification_id'});

Transaction.hasMany(TransactionItems, {as: 'TransactionItems', foreignKey: 'transaction_id'});

Account.belongsToMany(Purse, {through: AccountPurses, foreignKey: 'account_id'});
Purse.belongsToMany(Account, {through: AccountPurses, foreignKey: 'purse_id'});

Purse.belongsToMany(Transaction, {through: PurseTransactions, foreignKey: 'purse_id'});
Transaction.belongsToMany(Purse, {through: PurseTransactions, foreignKey: 'transaction_id'});

// Establishment.hasMany(EstablishmentPhoneNumber, {as: 'PhoneNumber', foreignKey: 'establishment_id '});)

/** Establishment **/
Establishment.belongsToMany(PhoneNumber, {through: EstablishmentPhoneNumber, foreignKey: 'establishment_id'});
PhoneNumber.belongsToMany(Establishment, {through: EstablishmentPhoneNumber, foreignKey: 'phone_number_id'});

Establishment.belongsToMany(Transaction, {through: EstablishmentTransaction, foreignKey: 'establishment_id'});

/** End Establishment **/


module.exports = Conn;