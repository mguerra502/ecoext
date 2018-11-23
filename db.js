const { Sequelize } = require('sequelize');

const Conn = new Sequelize(
  {
    host: "ex_maria",
    database: 'ecoext',
    username: 'root',
    password: process.env.ECOEXT_MARIADB_ROOTPASSWORD,
    dialect: 'mysql',
    port: 3306
  }
);
    
const Purse             = Conn.import(__dirname + "/db/schema/Purse")
const Account           = Conn.import(__dirname + "/db/schema/Account")
const AccountPurses     = Conn.import(__dirname + "/db/schema/AccountPurses")
const Establishment     = Conn.import(__dirname + "/db/schema/Establishment")
const Transaction       = Conn.import(__dirname + "/db/schema/Transaction")

Account.belongsToMany(Purse, {through: AccountPurses, foreignKey: 'account_id'});
Purse.belongsToMany(Account, {through: AccountPurses, foreignKey: 'purse_id'});

module.exports = Conn;