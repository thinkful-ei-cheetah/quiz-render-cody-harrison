'use strict';
/*global Question,trivaAPI, Model,$, Quiz */
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
    if(this.unasked.length === 0){
      this.scoreHistory.push(this.score);
      // this.toggleActive();
    }else{
      let userAnwer =$('input[name=answer]:checked').val();
      let current = this.unasked[0];
      current.submitAnswer(userAnwer);
      let correctCurrent = current.answerStatus();
      this.asked.push(this.unasked.splice(0,1));
      
      if(correctCurrent > 0){
        this.score ++;
      }
    }
  }
    
  


  toggleActive(){
    this.active = !this.active;
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

