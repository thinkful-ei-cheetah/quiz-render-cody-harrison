'use strict';
/*global trivaAPI Model*/
class question extends Model{
  constructor(){
    super()
    this.text='';
    this.answers=[];
    this.correctAnswer='';
    this.userAnswer;
    this.questionNumber=0;
  }
  questiontext(questionSet){
    this.text=questionSet[this.questionNumber];
    // questionSet.questions.pop();

  }
  correctAnswerChoice(questionSet){
    this.correctAnswer=questionSet[this.questionNumber];
    
  }
  answerText(questionSet){
    this.answers = questionSet[this.questionNumber];
    this.answers.push(this.correctAnswer);
    this.questionNumber++;
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
    
