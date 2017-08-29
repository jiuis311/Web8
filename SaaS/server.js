const express = require('express');
const fileController = require('./fileController.js');

let app = express();
const filename = 'test.txt';

var str='';
var strHeader="<head><meta charset='utf-8'><link rel='stylesheet' type='text/css' href='/style.css'><title></title></head>"
var strMenu="<nav class='menu'><a href='/index.html'><span>Homepage</span></a><a href='/about.html'><span>About</span></a><a href='/lorem-ipsum'><span>Source Code</span></a></nav>"

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/about', (req, res) => {
  res.send('About something.');
})

// app.get('/style.css', (req, res) => {
//   res.sendFile(__dirname + '/public/style.css');
// });

var newStr;

app.get('/lorem-ipsum', (req, res) => {
  newStr = fileController.readFileSync(filename);
  str += "<html>";
  str += strMenu;
  str += "<p>" + newStr +"</p>";
  str = "<body>" + str + "</body>";
  str = strHeader + str;
  str += "</html>";
  res.send(str);
});

// app.get('/app.js', (reg, res) => {
//   res.sendFile(__dirname + '/app.js');
// });
//
// app.get('/app.js', (reg, res) => {
//   res.sendFile(__dirname + '/test.txt');
// });
//
// app.get('/sourcecode.html', (reg, res) => {
//   res.sendFile(__dirname + '/sourcecode.html');
// })


app.listen(6969, () => {
  console.log('server is up');
});
