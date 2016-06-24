var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var filename = 'messages.txt';

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'hbs');
app.use(express.static('public'));


app.get('/query', function(req, res) {
  var name = req.query.name;
  var emotion = req.query.emotion;
  res.send('My name is ' + name + ' and I am ' + emotion + '!');
});

app.get('/', function(req, res) {
  res.send('In the main page!');
});

app.get('/some', function(req, res) {
  res.send('In some page!');
});

app.get('/hello', function(req, res) {
  res.render('hello', {
    title: 'Hello',
    content: 'Hello, world!'
  });
});

app.get('/home', function(req, res) {
  res.render('home-page', {
    title: 'Home Page'
  });
});

// navigate to about me page
app.get('/about', function(req, res) {
  res.render('about', {
    title: 'About Me'
  });
});

// navigate to projects page
app.get('/projects', function(req, res) {
  res.render('projects', {
    title: 'Some Work I have done'
  });
});

// navigate to contact page
app.get('/contact', function(req, res) {
  res.render('contact-form', {
    title: 'Fill this out to reach out'
  });
});

// save data to messages.txt
app.post('/send', function(req, res) {
  var data = req.body;
  var combo = 'name: ' + data.name + '\n' + 'message: ' + data.message + '\n';
  console.log(combo);
  // console.log(data);
  fs.appendFile(filename, combo, function(err) {
    if (err) {
      console.log("There was an error", err);
      return;
    }
    console.log('success');
  });
  res.render('thanks', data);
});


app.listen(8080, function() {
  console.log('reach me at PORT 8080!');
});
