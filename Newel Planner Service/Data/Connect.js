var Sequelize = require('sequelize');
var config = require('../Config');

/// Sequelize to connect the DB
console.log(config.dbConn.dbName, config.dbConn.dbUser, config.dbConn.dbPassword)
var sequelize = new Sequelize(config.dbConn.dbName, config.dbConn.dbUser, config.dbConn.dbPassword, {
    host: config.dbConn.dbServer,
    dialect: "postgres",
    port: 5432,
    logging: false,
    define: {
        timestamps: false,
    },
    timezone: "Asia/Kolkata"
});
// console.log('connection :' , sequelize)
var Op = Sequelize.Op;

module.exports = {sequelize: sequelize, Op: Op, Sequelize: Sequelize};