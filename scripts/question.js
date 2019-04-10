'use strict';
/*global TrivaAPI Model */
class Question extends Model{
  constructor(questionData){
    super();
    this.text=questionData.question;
    this.answers=[...questionData.incorrect_answers,questionData.correct_answer];
    this.correctAnswer= questionData.correct_answer;
    this.userAnswer=null;
    this.shuffle(this.answers);
  }
  submitAnswer(answer){
    this.userAnswer = answer;
  }
  answerStatus(){
    if(!this.userAnswer){
      return -1;
    }else if(this.userAnswer !== this.correctAnswer){
      return 0;
    }else{
      return 1;
    }
  }
  shuffle() {

    var currentIndex = this.answers.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.answers[currentIndex];
      this.answers[currentIndex] = this.answers[randomIndex];
      this.answers[randomIndex] = temporaryValue;
    }

  }
}
    
