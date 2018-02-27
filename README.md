# jwt-tokenizer-express
> simple authentification server by JWT token

## Note
Send token in headers **key** **x-access-token**

## Prepare to intsall

* install MongoDB
* create folder **data\db**
* create database **auth**
* install **nodemon** globally

## Install

```sh 
yarn
```

# Run

```sh
# run db server
path/to/mongoDB/bin/mongod # .exe

# run node server
yarn start
```

## Basic Routes
**http://localhost:8080** -- the unprotected routes like the home page

## API Routes
* **POST http://localhost:8080/api/authenticate** -- Check name and password against the database and provide a token if 
authentication successful. This route will not require a token because this is where we get the token  
* **GET http://localhost:8080/api** -- Show a random message. This route is protected and will require a token  
* **GET http://localhost:8080/api/users** -- List all users. This route is protected and will require a token
## App Structure
```
.
├── app
|   ├── configs
|   |   └── main.js
|   ├── controllers
|   |   ├── ApiController.js
|   |   └── MainController.js
|   ├── models
|   |   └── UserModel.js
|   └── services
|       ├── ConfigService.js
|       └── DatabaseService.js
├── node_modules/**
├── .gitignore
├── .npmrc
├── config.js
├── package.json
├── README.md
├── server.js
└── yarn.lock
```
## License

**MIT**
