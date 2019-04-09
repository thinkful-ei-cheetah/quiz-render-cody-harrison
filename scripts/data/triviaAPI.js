'use strict';
/*global trivaAPI,question,quiz*/
class trivaAPI {
  constructor(){
    this.questions = [];
    this.correctAnswers = [];
    this.incorrectAnswers = [];
  }
  newUrl(){
    return fetch('https://opentdb.com/api.php?amount=10')
      .then(res => res.json())
      .then(data =>{
        data.results.forEach(q=>{
          this.questions.push(q.question);
          this.correctAnswers.push(q.correct_answer);
          this.incorrectAnswers.push(q.incorrect_answers);
        });
        
      });
  }
}

// trivaAPI.url ='https://opentdb.com/api.php?amount=10';