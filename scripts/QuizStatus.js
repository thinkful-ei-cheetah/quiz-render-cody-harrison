/* global Renderer */
'use strict';

// eslint-disable-next-line no-unused-vars
class QuizStatus extends Renderer {
  template() {
    const score = this.model.score;
    const highScore = this.model.getHighScore();
    const current = this.model.asked.length;
    const total = this.model.asked.length + this.model.unasked.length;

    return `
      <div>
        Score: ${score}
      </div>
      <div>
        High Score: ${highScore}
      </div>
      <div>
        Progress: ${current === 0 ? 'Inactive' : `${current} of ${total}` }
      </div>
    `;
  }
}
