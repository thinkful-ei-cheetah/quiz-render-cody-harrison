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
    this.DEFAULT_QUIZ_LENGTH =2;
    this.api = new trivaAPI();
  }
  
  _getInitiaQuestions() {
    return this.api.getQuestions(Quiz.DEFAULT_QUIZ_LENGTH)
      .then(data => {
        console.log(data.results);
        const questions = data.results;
        questions.forEach(question => this.unasked.push(new Question(question)));
      });
  }
  
  scoreIncrease(){
    this.score++;
  }

  hadDoubleScore(targetScore){
    let count = 0 ;
    for(const score of this.scoreHistory){
      if(score === targetScore){
        count++;
        if(count>1) return true;
      }
    }
    return false;
  }
  
  startNewGame(){
    this.unasked = [];
    this.asked =[];
    this.score = 0;
    this.active = true;

    this._getInitiaQuestions()
      .then(()=> this.nextQuestion())
      .catch(err => console.log(err));
  }
  
  nextQuestion(){
    const current = this._getInitiaQuestions();
    if(current && current.userAnwer=== undefined){
      throw new Error('Must answer question');
    }
    if(this.unasked.length === 0){
      this.active === false;
      this.scoreHistory.unshift(this.score);
      this.update();
      return null;
    }
    this.asked.unshift(this.unasked.pop());
    this.update();
    return this.asked[0];
      
  }

  answerQuestion(answerText){
    const current = this._getInitiaQuestions();
    let answerStatus = current.answerStatus();

    if(answerStatus !== -1){
      throw new Error('Can not answer Question twice ');
    }
    current.submitAnswer(answerText);
    answerStatus = current.answerStatus();

    if(answerStatus === 1){
      this.scoreIncrease();
    }
    this.update();
    return answerStatus === 1;
  }

  currentQuestion(){
    return this.asked[0];
  }

  getHighScore(){
    return this.scoreHistory.length <1 ? 0 : Math.max(...this.scoreHistory);
  }

  newHighScore(){
    const newScore = this.scoreHistory[];
    const highestScore = Math.max(...this.scoreHistory);

    if(newScore === highestScore && this.hadDoubleScore(new)){
      return false;
    }
    if(newScore >= highestScore){
      return true;
    }
    return false;
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

