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

const randomString = (callback) => {
  var tmpQuestion;
  var idNum;
  var getQuestion = (callback) => {
    questionModel.count({}, (err, c) => {
      idNum = c;
      console.log('Idnum: ' + idNum);
      callback();
    });
  }

  getQuestion(() => {
    let questionId = Math.floor(Math.random() * idNum);
    console.log('question Id: ' + questionId);
    questionModel.findOne({ 'idNum' : questionId }, (err, question) => {
      tmpQuestion = question;
      callback(tmpQuestion);
    });
  });
  return;
}

const addNewQuestion = (question, callback) => {
  questionModel.count({}, (err, c) => {
      console.log("Id Num : " + c);
      let newQuestion = {
          question,
          idNum : c,
        };
      questionModel.create(newQuestion, (err, question) => {
        if (err) {
          console.log(err);
        } else {
          callback(question.idNum);
        }
      });
    });
}

const getQuestion = (id, callback) => {
  questionModel.findOne({'idNum' : id}, (err, question) => {
    console.log('Get question');
    callback(question);
  });
}

const updateQuestion = (id, question, callback) => {
  questionModel.findOneAndUpdate({_id : id}, question, {new : true}, (err, question1) => {
    callback();
  });
}

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
  addNewQuestion,
  getQuestion,
  updateQuestion
}
