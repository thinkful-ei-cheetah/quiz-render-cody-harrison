/* global Renderer $ */
'use strict';

class QuizDisplay extends Renderer {    // eslint-disable-line no-unused-vars
  getEvents() {
    return {
      'click .start': 'handleStart',
      'click .submit': 'handleAnswerQuestion',
      'click .continue': 'handleNextQuestion'
    };
  }

  _generateIntro() {
    return `
      <div>
        <p>
          Welcome to the Trivia Quiz
        </p>
        <p>
          Test your Smarts and see how high you can score!
        </p>
      </div>
      <div>
        <button class="start">Start</button>
      </div>
    `;
  }

  _generateQuestion() {
    let answerchoices=''; 
    this.model.unasked[0].answers.forEach(answer=>answerchoices+=`<li><input name="answer" class="answer" type="radio"  value="${answer}"><label> ${answer}</lable></li>`); 
    return `<form>${this.model.unasked[0].text} 
    ${answerchoices}<button class="submit" type="button">Submit</button></form>`;
  }
  _generateFeedback(){
    const current = this.model.currentQuestion();
    let html = '';
    if(current.answerStatus() === 1){
      html += `
      <div>
      <p>
        Great job! You got the right answer.
      </p>
      <p>
        ${current.correctAnswer}
      </p>
      </div>
      `;
    }else{
      html+= `
      <div>
      <p>
       You answered : ${current.userAnser}
      </p>
      <p>
        The correct answer is :
      <p>
        ${current.correctAnswer}
      </p>
      </div>
      `;
    }
    html += `
    <div>
      <button class="continue">Continue</button>
    </div>`;
    return html;
  }

  _generateOutro(){
    let highText = '';
    if(this.model.newhighScore()){
      highText =`
      <p>
        You have a new high score!
      </p>`;
    }
    return `
    <div>
      <p>
      Thanks for Playing!
      </p>
      ${highText}
      <div>
        <button class="start-quiz">Play Again</button>
      </div>
      </div>`;
  }


  template() {
    let html;
    const currentQuestion = this.model.correctQuestion();
    const answerStatus = currentQuestion && currentQuestion.answerStatus();

    if (this.model.asked.length === 0) {
      html = this._generateIntro();
    } else if(this.model.active && answerStatus === -1) {
      html = this._generateQuestion();
    } else if(this.model.active && answerStatus !== -1){
      html = this._generateFeedback();
    }else{
      html = this._generateOutro();
    }
    return html;
  }

  handleStart() {
    this.model.startNewGame();
  }

  handelAnswerQuestion(e){
    e.preventDefault();
    const userAnswer = e.target.answer.value;
    this.model.answerQuestion(userAnswer);
  }
  handleNextQuestion(){
    this.model.nextQuestion();
    
  }
}