const jwt = require('jsonwebtoken');

// services
const DatabaseService = require('../services/DatabaseService');

let _router = null;
let _secret = null;

class ApiController {
  static init({ router, secret }) {
    _router = router;
    _secret = secret;

    _router.get('/', (req, res) => {
      res.json({ message: 'Welcome to the coolest API on earth!' });
    });

    this._setAuthenticateRoutes();
    this._setTokenVerificationMiddleware();
    this._setUserRoutes();
  }

  static getHandler() {
    if (!_router) {
      throw new Error('Init router before getting handler!');
    }

    return _router;
  }

  static _setTokenVerificationMiddleware() {
    _router.use((req, res, next) => {
      const token =
        req.body.token || req.query.token || req.headers['x-access-token'];

      if (token) {
        // verifies secret and checks exp
        jwt.verify(token, _secret, (err, decoded) => {
          if (err) {
            return res.json({
              success: false,
              message: 'Failed to authenticate token.',
            });
          } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
          }
        });
      } else {
        // if there is no token
        // return an error
        return res.status(403).send({
          success: false,
          message: 'No token provided.',
        });
      }
    });
  }

  static _setAuthenticateRoutes() {
    // route to authenticate a user (POST http://localhost:8080/api/authenticate)
    _router.post('/auth', (req, res) => {
      DatabaseService.findUser({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
      })
        .then(user => {
          // if user is found and password is right
          // create a token with only our given payload
          // we don't want to pass in the entire user since that has the password
          const payload = { isAdmin: user.isAdmin };
          const options = { expiresIn: 60 * 60 * 24 }; // 1440 - expires in 24 hours

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'The token is generated successfully',
            token: jwt.sign(payload, _secret, options),
          });
        })
        .catch(error => {
          res.json({
            success: false,
            message: error,
          });
        });
    });
  }

  static _setUserRoutes() {
    // route to return all users (GET http://localhost:8080/api/users)
    _router.get('/users', (req, res) => {
      DatabaseService.getUsers()
        .then(users => {
          res.json(users);
        })
        .catch(error => {
          console.log(error);
        });
    });
  }
}

module.exports = ApiController;
