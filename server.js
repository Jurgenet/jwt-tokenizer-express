// controllers
const MainController = require('./app/controllers/MainController');
const mainController = new MainController();

mainController.connectDB();
mainController.start();
