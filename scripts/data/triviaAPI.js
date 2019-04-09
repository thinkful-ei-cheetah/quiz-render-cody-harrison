'use strict';
/*global trivaAPI,question,quiz,Model*/
class trivaAPI extends Model{
  constructor(){
    super();
    this.questions = [];
    this.correctAnswers = [];
    this.incorrectAnswers = [];
  }
  getQuestions(){
    return fetch('https://opentdb.com/api.php?amount=10')
      .then(res => res.json());
  }
}

// trivaAPI.url ='https://opentdb.com/api.php?amount=10';