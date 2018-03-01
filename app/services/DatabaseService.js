const mongoose = require('mongoose');

const UserModel = require('../models/UserModel');

class DatabaseService {
  static init(props) {
    mongoose
      .connect(props.database)
      .then(console.log('I am mongoose, and i ready to use.'))
      .catch(error => console.log(error));
  }

  static createUser(userProps) {
    const { userId, password, isAdmin } = userProps;

    const user = new UserModel({
      userId,
      password,
      isAdmin,
      createdAt: Date.now(),
    });

    user.save(err => {
      if (err) throw err;

      console.log('User saved successfully');
    });
  }

  static getUsers() {
    return new Promise((res, rej) => {
      UserModel.find({}, (err, users) => {
        if (!err) {
          res(users);
        } else {
          rej(err);
        }
      });
    });
  }

  static findUser(userProps) {
    const { userId, password } = userProps;

    return new Promise((res, rej) => {
      UserModel.findOne({ userId }, (err, user) => {
        if (err) rej(err);

        if (!user) {
          rej('Authentication failed. User not found.');
        } else {
          // check if password matches
          if (user.password != password) {
            rej('Authentication failed. Wrong password.');
          } else {
            res(user);
          }
        }
      });
    });
  }
}

module.exports = DatabaseService;
