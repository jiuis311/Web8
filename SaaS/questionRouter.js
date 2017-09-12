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
  questionObj = fileController.objectReader(filename);
  arrayLength = questionObj.questions.length;
  questionId = Math.floor(Math.random() * arrayLength);
  res.render('question', {
    question : questionObj.questions[questionId].str,
    idLink :  `/question/api/question/${questionId+1}`,
    layout : 'question-layout',
    state2 : "active"
  });
});

Router.post('/api/question/:id', (req, res) => {
  questionObj = fileController.objectReader(filename);
  questionId = req.params.id - 1;
  if (req.body.yes == 1) {
    questionObj.questions[questionId].yes++;
  }
  if (req.body.no == 0) {
    questionObj.questions[questionId].no++;
  }
  if (req.body.reloadQuestion) {
    res.redirect('/question');
    return;
  }
  if (req.body.voteResult) {
    res.redirect(`/question/${questionId+1}`);
    return;
  }
  fileController.saveObject(filename, questionObj);
  res.redirect(`/question/${questionId+1}`);
});


//Add a new question
Router.get('/ask', (req, res) => {
  res.render('addquestion', {
    layout : 'question-layout',
    state3 : "active"
  });
});

Router.post('/api/question', (req, res) => {
  filename = "question.txt";
  questionObj = fileController.objectReader(filename);
  questionStat = {
    str : req.body.question,
    yes : 0,
    no : 0
  };
  questionObj.questions.push(questionStat);
  fileController.saveObject(filename, questionObj);
  arrayLength = questionObj.questions.length;
  res.redirect('/question/question-result');
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
  questionObj = fileController.objectReader(filename);
  arrayLength = questionObj.questions.length;
  let questionId = parseInt(req.params.id) - 1;
  console.log(req.params);
  if (questionId > -1 && questionId < arrayLength) {
    res.render('question-id', {
      str : questionObj.questions[questionId].str,
      yes : questionObj.questions[questionId].yes,
      no : questionObj.questions[questionId].no,
      layout : 'question-layout',
      state4 : "active"
    });
  } else res.render("wrong-id", {layout : 'question-layout'});
});

module.exports = Router;
