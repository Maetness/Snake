const express = require('express');
const app = express();
import mongoose from 'mongoose';
const db = mongoose.connect('mongodb://localhost:27017/somedumm');
import User from './user.model.js';
import Highscores from './highscore.model.js';

const bodyParser = require('body-parser');

// get around cors errors
const cors = require('cors');
/*var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 
}*/
app.use(cors());


// access post data like
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this is nice it allows for static files under static folder to be accessed
// usefull for images from server
//app.use(express.static('static'));

// Register
  app.route("/api/user/create").post((req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    // todo write function on existing username
    if (username && password) {      
      let date = new Date().toDateString();
      let user = new User({username: username, password: password, membersinze: date, playedgames: 0});
      user.save();
      res.status(201).send("yes");
    } else {
      res.status(333).send("no");
    }
  });

  // Login
  app.route("/api/user/login").post((req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    User.find({username: username}).then((data) =>
    {
      if (password == data[0].password) {
        res.status(201).send("yes");
      } else {
        res.status(333).send("no");
      }
    }
    );
  });


  // Utility
  app.route('/api/user/byname/:name').get((req, res) => {
    User.findOne({ username: req.params['name']}, (err, user) => {
        res.json(user)
    }) 
  });

  // Utility
  app.route('/api/user/delete/:name').get((req, res) => {
    User.findOne({ username: req.params['name']}, (err, user) => {
      user.delete();
      res.status(333).send("deleted");
  }) 
  });

  // Utility
  app.route('/api/user/all').get((req, res) => {
    User.find({}, (err, user) => {
        res.json(user)
    }) 
  });

  // Ranking
  app.route('/api/highscore/all').get((req, res) => {
    Highscores.find({}, (err, some) => {
      res.json(some)
    }) 
  });

  // TopUser
  app.route('/api/user/best').get((req, res) => {
    User.find().sort({
      "playedgames": -1
    }).limit(5).then((data) => {
      res.json(data);
    });
  });

  // UserInfo
  app.route('/api/user/info/:name').get((req, res) => {
    User.findOne({ username: req.params['name']}, (err, user) => {
      res.json(user)
  }) 
  });

  // User Highscores
  app.route('/api/highscore/user/:name').get((req, res) => {
    User.findOne({ username: req.params['name']}, (err, user) => {
      if (user) {
        res.json(user.highscores);
      } else {
        res.json();
      }
    }) 
  });

  // Game Over
  app.route("/api/highscore/set").post((req, res) => {

    console.log("inn", req.body);

    let name = req.body.username;
    let score = parseInt(req.body.highscore);

    console.log("some", name, score);

    if (name && score) {

      Highscores.countDocuments().then((mysize) => {     
        if (mysize < 5) {
          new Highscores({user: name, highscore: score}).save();
        } else {
          Highscores.find().sort({
            "highscore": 1
          }).limit(1).then((data) => {
           if (data[0].highscore < score) {
              data[0].delete();
              let newScore = new Highscores({user: name, highscore: score}).save();
            }
          });
        }
      });

      User.findOne({ username: name }, (err, user) => {
        let games = user.playedgames + 1;
        user.playedgames = games;
        if (user.highscores.length < 5) {
          user.highscores.push({highscore: score});
        } else {
          if (user.highscores.sort()[0].highscore < score) {
            user.highscores.sort()[0].remove();
            user.highscores.push({highscore: score});
          }
        }
        user.save();
      }) 
    }

    res.send(req.body);
  });

  // Utility
  app.route('/api/user/deleteAll').get((req, res) => {
    mongoose.connection.db.dropDatabase();
    res.status(200).send("droped");
  });

  // Utility
  app.route("/api/highscore/all/default").get((req, res) =>{
    let score = new Highscores({user: "huber", highscore: "111"});
    score.save();
    score = new Highscores({user: "huber1", highscore: "2"});
    score.save();
    score = new Highscores({user: "huber2", highscore: "3"});
    score.save();
    score = new Highscores({user: "huber3", highscore: "4"});
    score.save();
    score = new Highscores({user: "huber4", highscore: "5"});
    score.save();
    res.status(333).send("yes");
  });

  // Utility
  app.route("/api/user/all/default").get((req, res) =>{
    let user = new User({username: "huber", password: "some"});
    user.save();
    user = new User({username: "huber1", password: "some"});
    user.save();
    user = new User({username: "huber2", password: "some"});
    user.save();
    user = new User({username: "huber3", password: "some"});
    user.save();
    user = new User({username: "huber4", password: "some"});
    user.save();
    res.status(333).send("yes");
  });


  // port server listens to
app.listen(8000, () => {
  console.log('Server started!');
});
