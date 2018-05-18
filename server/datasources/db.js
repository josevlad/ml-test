import Sequelize from 'sequelize'
import settings from '../settings'


// console.log('process.env.DB_LOGGING: ', process.env.DB_LOGGING)

let sequelize = new Sequelize(
    settings.DB.NAME, 
    settings.DB.USER, 
    settings.DB.PASS, 
    {
        host: settings.DB.HOST,
        dialect: 'mysql',
        operatorsAliases: false,
        logging: settings.DB.LOGGING == "true" ? console.log : false,

        define: {
            underscored: false,
            freezeTableName: false,
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci'
            },
            timestamps: true
        },

        // similar for sync: you can define this to always force sync for models
        sync: { force: true },

        // pool configuration used to pool database connections
        pool: {
            max: 5,
            idle: 30000,
            acquire: 60000,
        }
    }
)

const associateModels = (models) => {
    // console.log('associateModels: ', models)
    Object.keys(models).forEach(modelName => {
        if (models[modelName].associate) {
            models[modelName].associate(models);
        }
    });
}

const sync = () => {
    return sequelize.sync()
}

const db = { sequelize, Sequelize, associateModels, sync }

export default db

