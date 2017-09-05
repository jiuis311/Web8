const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const fileController = require('./fileController.js');
const questionRouter = require('./questionRouter.js');

let app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.engine('handlebars', handlebars({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');


app.get('/', (req, res) =>{
  res.render('home', {
    head : `<link rel="stylesheet" type="text/css" href='/home-layout-style.css'>`
  });
});


app.get('/about', (req, res) => {
  res.render('about', {
    head : `<link rel="stylesheet" type="text/css" href='/about-style.css'>`
  });
});

app.get('/lorem-ipsum', (req, res) => {
  var filename = 'test.txt';
  var str = fileController.readFileSync(filename);
  res.render('lorem-ipsum', { str : str} );
});


app.use('/question', questionRouter);
app.use(express.static(__dirname + '/public'));

app.listen(6969, () => {
  console.log('Server is up. Linh is handsome');
});
