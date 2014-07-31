'use strict';

var express = require('express');
var morgan = require('morgan');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/checkers', function(req, res){
  res.render('checkers');
});

app.get('/add/:i/:j/:k/:l', function(req, res){
  req.params.i *=1;
  req.params.j *=1;
  req.params.k *=1;
  req.params.l *=1;

  req.params.fontsize = req.query.fontsize;
  req.params.color = req.query.color;
  req.params.borderwidth = req.query.borderwidth;
  
  res.render('sum', req.params);
});

app.get('/sumlist/:list', function(req, res){
  req.params.list = req.params.list.split(',');

  req.params.list = req.params.list.map(function(x){
    return x * 1;
  });

  var sum = 0;

  for(var i = 0; i < req.params.list.length; i++){
    sum += req.params.list[i];
  }

  req.params.sum = sum;

  req.params.odd = req.query.odd;
  req.params.even = req.query.even;

  res.render('sumlist', req.params);
});

app.get('/rolldice/:x', function(req, res){
  var rolls = [];
  var sum = 0;

  for(var i = 0; i < req.params.x; i++){
    rolls.push(Math.floor(Math.random()*6)+1);
    sum += rolls[i];
  }

  res.render('rolldice', {rolls:rolls, sum:sum});
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express.js is listening on PORT', port);
});
