const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileController = require('./fileController.js');
const questionRouter = require('./questionRouter.js');

let app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.engine('handlebars', handlebars({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');


app.get('/', (req, res) =>{
  res.render('home', {
    head : `<link rel="stylesheet" type="text/css" href='/home-layout-style.css'>`,
    state1 : "active"
  });
});


app.get('/about', (req, res) => {
  res.render('about', {
    head : `<link rel="stylesheet" type="text/css" href='/about-style.css'>`,
    state2 : "active"
  });
});

app.get('/lorem-ipsum', (req, res) => {
  var filename = 'test.txt';
  var str = fileController.readFileSync(filename);
  res.render('lorem-ipsum', {
    str : str,
    state3 : "active"
  } );
});


app.use('/question', questionRouter);
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/quizd', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect success');
  }
})

app.listen(6969, () => {
  console.log('Server is up. Linh is handsome');
});
