var express = require('express');
var bodyParser = require('body-parser');
var models = require('./db/orm-model.js');

var app = express();

app.set('view engine', 'html');
app.use('/', express.static('./public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//require sequelize models
var models = models();
var User = models.User;
var Activity = models.Activity;

//Insert or update user information in database
app.post('/data/user', function(req, res) {
  'use strict';
  console.log(req.body);
  User.upsert({
    userId: req.body.user_id,
    email: req.body.email,
    picture: req.body.picture || req.body.gravatar,
    name: req.body.name,
    nickname:req.body.nickname});
  res.sendStatus(200);
});

app.get('/data/user', function(req, res){
  'use strict';
  res.sendStatus(200);
});

app.post('/data/activities', function(req, res){
  'use strict';
  Activity.create({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    keywords: req.body.keywords
  });
  res.redirect('/');
});

app.get('/data/activities', function(req, res){
  'use strict';
  Activity.findAll({})
  .then(function(err, data){
    res.send(200, data);
  });
});

module.exports = app;
