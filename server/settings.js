import dotenv from 'dotenv'

// Cargo las variables de entorno
dotenv.config()



const settings = {
    APP: {
        PORT: process.env.APP_PORT
    },
    ML:{
        API_URL: process.env.ML_API_URL
    },
    DB: {
        NAME: process.env.DB_NAME,
        HOST: process.env.DB_HOST,
        USER: process.env.DB_USER,
        PASS: process.env.DB_PASS,
        LOGGING: process.env.DB_LOGGING
    }
}

export default settings