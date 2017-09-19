const fs = require('fs');
const questionModel = require('./questionSchema.js');

const saveFile = (filename, data) => {
  fs.writeFileSync(filename, data);
}

const appendFile = (filename, data) => {
  fs.appendFileSync(filename, data);
}

const readFileSync = (filename) => {
  let result = fs.readFileSync(filename, {encoding :'utf-8'});
  return result;
}

const readFile = (filename, callback) => {
  fs.readFile(filename, {encoding : 'utf-8'},
  (err, data) => {
    callback(data);
  });
}

const objectReader = (filename) => {
  let questionStr = readFileSync(filename);
  let questionObj = JSON.parse(questionStr);
  return questionObj;
}

const randomString = (questionObj) => {
  let arrayLength = questionObj.questions.length;
  let questionId = Math.floor(Math.random() * arrayLength);
  return questionObj.questions[questionId].str;
}

const addNewQuestion = (question, callback) => {
  let newQuestion = {
    question,
  };
  questionModel.create(newQuestion, (err, question) => {
    if (err) {
      console.log(err);
    } else {
      console.log(question);
      callback(question._id);
    }
  });
}

//
// questionModel.create(newQuestion, (err, question) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(question);
//   }
// });

const saveObject = (filename, questionObj) => {
  questionStr = JSON.stringify(questionObj);
  saveFile(filename, questionStr);
}

module.exports = {
  saveFile,
  appendFile,
  readFileSync,
  readFile,
  objectReader,
  randomString,
  saveObject,
  addNewQuestion
}
