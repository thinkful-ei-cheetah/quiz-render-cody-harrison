/* global Renderer */
'use strict';
// eslint-disable-next-line no-unused-vars
class QuizDisplay extends Renderer {
  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
      'submit .answer-form': 'handleAnswerQuestion',
      'click .continue': 'handleContinue',
    };
  }

  _generateIntro() {
    return `
      <div>
        <p>
          Welcome to the Trivia Quiz
        </p>
        <p>
          Test your smarts and see how high you can score!
        </p>
      </div>
      <div>
        <button class="start-quiz">Start Quiz</button>
      </div>
    `;
  }

  _generateQuestion() {
    const question = this.model.getCurrentQuestion();
    return `
      <div>
        <p>
          ${question.text}
        </p>
        <form class="answer-form">
          <div>
            ${question.answers.map((answer, ind) => `
              <div>
                <input type="radio" name="answer" id="answer-${ind}" value="${answer}" />
                <label for="answer-${ind}">${answer}</label>
              </div>
            `).join('')}
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
`;
  }

  _generateFeedback() {
    const current = this.model.getCurrentQuestion();
    let html = '';
    if (current.answerStatus() === 1) {
      html +=  `
        <div>
          <p>
            Great job! You got the right answer.
          </p>
          <p>
            ${current.correctAnswer}
          </p>
        </div>
`;
    } else {
      html += `
        <div>
          <p>
            Sorry, that's incorrect.
          </p>
          <p>
            You answered: ${current.userAnswer} 
          </p>
          <p>
            The correct answer is:
          </p>
          <p>
            ${current.correctAnswer}
          </p>
        </div>
      `;
    }

    html += `
      <div>
        <button class="continue">Continue</button>
      </div>
    `;
    return html;
  }

  _generateOutro() {
    let highText = '';
    if (this.model.isNewHighScore()) {
      highText = `
        <p>
          You have a new high score!
        </p>
      `;
    }

    return `
      <div>
        <p>
          Thanks for playing!
        </p>
        ${highText}
        <div>
          <button class="start-quiz">Play Again</button>
        </div>
      </div>
`;
  }

  template() {
    let html;
    const currentQuestion = this.model.getCurrentQuestion();
    const answerStatus = currentQuestion && currentQuestion.answerStatus();
    
    if (this.model.asked.length === 0) {
      // Quiz has not started
      html = this._generateIntro();
    } else if (this.model.active && answerStatus === -1) {
      // Quiz is active and question unanswered
      html = this._generateQuestion();
    } else if (this.model.active && answerStatus !== -1) {
      // Quiz is active and question answered
      html = this._generateFeedback();
    } else {
      // Quiz is finished
      html = this._generateOutro();
    }
    return html;
  }

  handleStart() {
    this.model.startNewGame();
  }

  handleAnswerQuestion(e) {
    e.preventDefault();
    const userAnswer = e.target.answer.value;
    this.model.answerQuestion(userAnswer);
  }

  handleContinue() {
    this.model.nextQuestion();
  }

}