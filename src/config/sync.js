const sequelize = require('./database');

require('../models');

class DatabaseSync {
    static async sync() {
        try {
            await sequelize.authenticate();

            console.log('Database connection established successfully');

            await sequelize.sync({ alter: false });

            console.log('Database synchronized successfully');

        } catch (error) {
            console.error('Error synchronizing the database:', error);
            throw error;
        }
    }
}

module.exports = DatabaseSync;