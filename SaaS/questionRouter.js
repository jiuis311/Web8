const express = require('express');
const fileController = require('./fileController.js');
const Router = express.Router();

let filename = "question.txt";
let questionId;
let questionStr;
let questionObj;
let arrayLength;
let questionStat;

Router.get('/', (req,res) => {
  filename = "question.txt";
  questionObj = fileController.objectReader(filename);
  arrayLength = questionObj.questions.length;
  questionId = Math.floor(Math.random() * arrayLength);
  res.render('question', {question : questionObj.questions[questionId].str, layout : 'question-layout'});
});

Router.post('/', (req, res) => {
  questionObj = fileController.objectReader(filename);
  if (req.body.yes == 1) {
    questionObj.questions[questionId].yes++;
  }
  if (req.body.no == 0) {
    questionObj.questions[questionId].no++;
  }
  fileController.saveObject(filename, questionObj);
  res.redirect(`/question/${questionId+1}`);
});

Router.get('/addquestion', (req, res) => {
  res.render('addquestion', {layout : 'question-layout'});
});

Router.post('/addquestion', (req, res) => {
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

Router.get('/question-result', (req, res) => {
  questionObj = fileController.objectReader(filename);
  arrayLength = questionObj.questions.length;
  res.render('question-result', {
    qId : {
      start : 1,
      end : arrayLength
    },
    layout : 'question-layout'
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
      layout : 'question-layout'
    });
  } else res.render("wrong-id", {layout : 'question-layout'});
});

module.exports = Router;
