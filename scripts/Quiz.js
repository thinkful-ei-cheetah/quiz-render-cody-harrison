'use strict';
/*global Question,trivaAPI, Model, Quiz */
let testQuestion;
class Quiz extends Model {
  constructor(){
    super();
    this.unasked= [];
    this.asked = [];
    this.score = 0;
    this.scoreHistory= [];
    this.active = false;
  }
  nextQuestion(){
    this.asked.push(this.unasked[0]);
    this.unasked.splice(0,1);
  }
  // addScore(userAnswer,correctAnswer){
      
  //   if(userAnswer === correctAnswer){
  //     this.score++;
  //   }
  //   this.scoreHistory.push(this.score);
  // }
  toggleActive(){
    if(this.active===false){
      this.active =true;
    }
    
  }
  startNewGame() {
    const api = new trivaAPI();
    return api.getQuestions()
      .then(data => {
        console.log(data.results);
        const questions = data.results;
        questions.forEach(question => this.unasked.push(new Question(question)));
      });
  }
  
      
}
// test.newUrl().then(()=>{
//   const test2=new question();
//   test2.questiontext(test.questions);
//   test2.correctAnswerChoice(test.correctAnswers);
//   test2.answerText(test.incorrectAnswers);
//   const test3=new Quiz();
//   test3.startquestions(test.questions);
//   // test3.askedQuestions();
//   test3.addScore(test2.correctAnswer,test2.correctAnswer);
//   test3.questionNumber = test2.questionNumber;
//   console.log(test3.unasked);
  // console.log(test3.asked);
  
  
  //   test2.questiontext(test.questions);
  //   test2.correctAnswerChoice(test.correctAnswers);
  //   test2.answerText(test.incorrectAnswers);
  //   test2.shuffle();
  //   console.log(test2.correctAnswer);
  //   console.log(test2.answers);
    
  
// });

