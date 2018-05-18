import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import path from 'path'
import settings from './settings'
import * as ml from './packages/ml'
import * as datasources from './datasources'

const models = Object.assign({},
    ml.models
)

// FUNDAMENTAL PARA QUE SE ASOCIEN BIEN TODOS LOS MODELOS:
datasources.db.associateModels(models)   

// SYNC SEQUELIZE:
datasources.db.sync()
.then(() => {
    //console.log('Base Sincronizada!!')
})  

// Initialize the server
const app = express()
const PORT = process.env.APP_PORT || 3000
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
//app.use('*', cors({ origin: `http://localhost:${PORT}` }))

app.use('/api', ml.routes.api)

const CLIENT_BUILD_PATH = path.resolve(__dirname, '../client/build')
const staticServe = express.static(CLIENT_BUILD_PATH)
app.use(staticServe)

const router = express.Router()

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
    res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
})


// Start the server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
})

// Handle the bugs somehow
app.on('error', error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT
  
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1)
        break;
      default:
        throw error
    }
  })
