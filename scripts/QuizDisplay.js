/* global Renderer $ */
'use strict';

class QuizDisplay extends Renderer {    // eslint-disable-line no-unused-vars
  getEvents() {
    this.model.startNewGame();
    return {
      'click .start': 'handleStart',
      'click .submit': 'nextQuestion'
    };
  }

  _generateIntro() {
    return `
      <div>
        <p>
          Welcome to the Trivia Quiz
        </p>
      </div>
      <div>
        <button class="start">Start</button>
      </div>
    `;
  }

  _generateQuestion() {
    let answerchoices=``; 
    this.model.unasked[0].answers.forEach(answer=>answerchoices+=`<li><input name="answer" class="answer" type="radio"  value="${answer}"><label> ${answer}</lable></li>`); 
    return `<form>${this.model.unasked[0].text} 
    ${answerchoices}<button class="submit" type="button">Submit</button></form>`;
  }


  template() {
    if (this.model.active) {
      return this._generateQuestion();
    } else {
      return this._generateIntro();
    }
  }

  handleStart() {
    
    this.model.toggleActive();
    this.model.update();
  }
  nextQuestion(){
    // this.model.asked ( $('input[name=answer]:checked').val());
    // console.log(this.model.asked);
    this.model.nextQuestion();
    this.model.update();
    
  }
}