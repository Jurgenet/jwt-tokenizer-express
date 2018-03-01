const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRoutes = express.Router();
const cors = require('cors');

// controllers
const ApiController = require('./ApiController');

// services
const ConfigService = require('../services/ConfigService');
const DatabaseService = require('../services/DatabaseService');

class MainController {
  constructor() {
    this._apiController = null;

    this._port = null;
  }

  connectDB() {
    const { database, secret } = ConfigService.getConfigParams();

    DatabaseService.init({ database });
    app.set('secret', secret);
  }

  start() {
    this._port = ConfigService.getConfigParams().port;

    // use body parser so we can get info from POST and/or URL parameters
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    // use morgan to log requests to the console
    app.use(morgan('dev'));

    app.get('/', (req, res) => {
      res.send(`Hello! The API is at http://localhost:${this._port}/api`);
    });

    this._setApiRoutes();

    app.listen(this._port);
    console.log(`Magic happens at http://localhost:${this._port}`);
  }

  _setApiRoutes() {
    ApiController.init({ router: apiRoutes, secret: app.get('secret') });
    // apply the routes to our application with the prefix /api
    app.use('/api', ApiController.getHandler());
  }
}

module.exports = MainController;
