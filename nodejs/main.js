const express = require('express');
const app = express();

app.listen(8000, () => {
    console.log('Server started!');
  });
  app.route('/api/cats').get((req, res) => {
    res.send({
      cats: [{ name: 'lilly' }, { name: 'lucy' }]
    });
  });

  app.route('/api/cats/:name').get((req, res) => {
    const requestedCatName = req.params['name'];
    res.send({ name: requestedCatName });
  });

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.route('/api/cats').post((req, res) => {
  res.send(201, req.body);
});

app.route('/api/cats/:name').put((req, res) => {
    res.send(200, req.body);
  });


  app.route('/api/cats/:name').delete((req, res) => {
    res.sendStatus(204);
  });

  /*
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/mydb";
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
  });
  */

/*
 var mongoose = require('mongoose');
 //Set up default mongoose connection
 var mongoDB = 'mongodb://127.0.0.1/my_database';
 mongoose.connect(mongoDB);
 // Get Mongoose to use the global promise library
 mongoose.Promise = global.Promise;
 //Get the default connection
 var db = mongoose.connection;
*/

 import mongoose from 'mongoose';

 //const mongoose = require('mongoose');

 const db = mongoose.connect('mongodb://localhost:27017/somedumm');
 
 import User from './user.model.js';

 //const User = require("./user.model.js");

 /*
  app.route('/test/bulk')
    .get((req, res) => {})
    .post((req, res) => {
        let userr = new User({username: 'First', password: 'some', highscore: "0" });
        userr.save();
        userr = new User({username: 'Second', password: 'some1', highscore: "10" });
        userr.save();
        userr = new User({username: 'Third', password: 'some2', highscore: "110" });
        userr.save();
        res.status(201).send(userr) 
  });
*/

  app.post("/test/bulk", (req, res) => {
    let userr = new User({username: 'First', password: 'some', highscore: "0" });
    userr.save();
    userr = new User({username: 'Second', password: 'some1', highscore: "10" });
    userr.save();
    userr = new User({username: 'Third', password: 'some2', highscore: "110" });
    userr.save();
    res.status(201).send(userr) 
  });

  app.route('/test/all').get((req, res) => {
    User.find({}, (err, books) => {
        res.json(books)
    }) 
  });

  /*
const cors = require('cors')

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))
*/

