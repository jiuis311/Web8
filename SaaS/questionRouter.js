const express = require('express');
const fileController = require('./fileController.js');
const Router = express.Router();

let filename = "question.txt";
let questionId;
let questionStr;
let questionObj;
let arrayLength;
let questionStat;

//Answer the a random question
Router.get('/', (req,res) => {
  filename = "question.txt";
  fileController.randomString((tmp) => {
    console.log(tmp);
    questionId = tmp.idNum;
    res.render('question', {
      question : tmp.question,
      idLink :  `/question/api/question/${questionId}`,
      layout : 'question-layout',
      state2 : "active"
    });
  });
  // questionObj = fileController.objectReader(filename);
  // arrayLength = questionObj.questions.length;
  // questionId = Math.floor(Math.random() * arrayLength);
});

Router.post('/api/question/:id', (req, res) => {
  questionId = req.params.id;
  fileController.getQuestion(questionId, (question) => {
    if (req.body.yes) {
      question.yes++;
    }
    if (req.body.no) {
      question.no++;
    }
    if (req.body.reloadQuestion) {
      res.redirect('/question');
      return;
    }
    if (req.body.voteResult) {
      res.redirect(`/question/${questionId}`);
      return;
    }
    fileController.updateQuestion(question._id, question, () => {
      res.redirect(`/question/${questionId}`);
    });
  });
});


//Add a new question
Router.get('/ask', (req, res) => {
  res.render('addquestion', {
    layout : 'question-layout',
    state3 : "active"
  });
});

Router.post('/api/question', (req, res) => {
  fileController.addNewQuestion(req.body.question, (id) => {
    res.redirect(`/question/${id}`);
  });
});


//Get question result
Router.get('/question-result', (req, res) => {
  questionObj = fileController.objectReader(filename);
  arrayLength = questionObj.questions.length;
  res.render('question-result', {
    qId : {
      start : 1,
      end : arrayLength
    },
    layout : 'question-layout',
    state4 : "active"
  });
});

Router.post('/question-result', (req, res) => {
  let idNum = parseInt(req.body.id);
  res.redirect(`/question/${idNum}`);
})

Router.get('/:id', (req, res) => {
  let questionId = req.params.id;
  fileController.getQuestion(questionId, (question) => {
    res.render('question-id', {
      str : question.question,
      yes : question.yes,
      no : question.no,
      layout : 'question-layout',
      state4 : "active"
    });
  })
});

module.exports = Router;
