/* global Renderer */
'use strict';

class QuizDisplay extends Renderer {    // eslint-disable-line no-unused-vars
  getEvents() {
    this.model.startNewGame();
    return {
      'click .start': 'handleStart',
      'click .answer': 'nextQuestion'
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
    console.log(this.model.active);
    this.model.unasked[0].answers.forEach(answer=>answerchoices+=`<li><button class="answer" type="radio"> ${answer}</button></li>`); 
    return `${this.model.unasked[0].text} 
    <form>`+answerchoices+` </form> `;
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
    this.model.nextQuestion();
    this.model.update();
    
  }
}