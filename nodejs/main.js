const express = require('express');
const app = express();
import mongoose from 'mongoose';
const db = mongoose.connect('mongodb://localhost:27017/somedumm');
import User from './user.model.js';
const bodyParser = require('body-parser');

// access post data like
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this is nice it allows for static files under static folder to be accessed
// usefull for images from server
//app.use(express.static('static'));

  app.post("/user/create", (req, res) => {


    let username = req.body.username;
    let password = req.body.password;

    // todo write function on existing username
    if (username && password) {
      let user = new User({username: username, password: password});
      user.save();
      res.status(201).send("yes");
    } else {
      res.status(333).send("no");
    }
  });

  app.route('/user/byname/:name').get((req, res) => {
    // req.params['name']
    // { projection: { _id: 0, name: 1, address: 1 } }
    User.findOne({ username: req.params['name']}, (err, user) => {
        res.json(user)
    }) 
  });

  app.route('/user/delete/:name').get((req, res) => {
    // req.params['name']
    // { projection: { _id: 0, name: 1, address: 1 } }
    User.findOne({ username: req.params['name']}, (err, user) => {
      user.delete();
      res.status(333).send("deleted");
  }) 
  });

  app.route('/user/all').get((req, res) => {
    User.find({}, (err, user) => {
        res.json(user)
    }) 
  });

  app.route('/user/deleteAll').get((req, res) => {
    mongoose.connection.db.dropDatabase();
    res.status(200).send("droped");
  });

  // port server listens to
app.listen(8000, () => {
  console.log('Server started!');
});



// maybe used later
/*
const cors = require('cors')
var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions))
*/
