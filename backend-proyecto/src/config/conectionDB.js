const { Sequelize} = require('sequelize');

const db = new Sequelize(
        database = 'eggbbalance',
        username = 'root',
        password = 'Zaradani0217?',   
    {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306
    }
);

module.exports = db;
