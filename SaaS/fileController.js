const fs = require('fs');

const saveFile = (filename, data) => {
  fs.writeFileSync(filename, data);
}

const readFileSync = (filename) => {
  let result = fs.readFileSync(filename, {encoding :'utf-8'});
  return result;
}

const readFile = (filename, callback) => {
  fs.readFile(filename, {encoding : 'utf-8'},
  (err, data) => {
    callback(data);
  })
}

module.exports = {
  saveFile,
  readFileSync,
  readFile
}
