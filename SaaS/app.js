const fileController = require('./fileController');
const filename = 'test.txt';

console.log(fileController.readFileSync(filename));

// console.log(fileController.readFile(filename));
// console.log("Hello World");
