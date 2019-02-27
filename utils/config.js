const dotenv = require("dotenv");

let path;
switch (process.env.NODE_ENV) {
    case "test":
        console.log("it got here 1")
        path = `${__dirname}/../.env.test`;
        break;
    case "production":
        console.log("it got here 2")
        path = `${__dirname}/../.env.production`;
        break;
    default:
        console.log("it got here 3")
        path = `${__dirname}/../.env`;
}

dotenv.config({
    path: path
});

module.exports.ECOEXT_DATABASE = process.env.ECOEXT_DATABASE;
module.exports.ECOEXT_DATABASE_ROOTPASSWORD = process.env.ECOEXT_DATABASE_ROOTPASSWORD;
module.exports.ECOEXT_MARIADB_DATA = process.env.ECOEXT_MARIADB_DATA;
module.exports.ECOEXT_MARIADB_DUMP = process.env.ECOEXT_MARIADB_DUMP;
module.exports.ECOEXT_MARIADB_HOST = process.env.ECOEXT_MARIADB_HOST;
module.exports.ECOEXT_DATABASE_USER = process.env.ECOEXT_DATABASE_USER;
module.exports.ECOEXT_MARIADB_PORT = process.env.ECOEXT_MARIADB_PORT;
module.exports.ECOEXT_MYSQL_DATA = process.env.ECOEXT_MYSQL_DATA;
module.exports.ECOEXT_MYSQL_DUMP = process.env.ECOEXT_MYSQL_DUMP;
module.exports.ECOEXT_MYSQL_HOST = process.env.ECOEXT_MYSQL_HOST;
module.exports.ECOEXT_MYSQL_PORT = process.env.ECOEXT_MYSQL_PORT;
module.exports.ECOEXT_WEB_PASSWORD = process.env.ECOEXT_WEB_PASSWORD;
module.exports.ECOEXT_WEB_PORT = process.env.ECOEXT_WEB_PORT;
module.exports.ECOEXT_WEB_MAIN_VOLUME = process.env.ECOEXT_WEB_MAIN_VOLUME;