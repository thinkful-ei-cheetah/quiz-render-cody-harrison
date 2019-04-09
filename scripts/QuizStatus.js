/* global Renderer */
'use strict';

class QuizStatus extends Renderer {    // eslint-disable-line no-unused-vars
  template() {
    return `
      <div>Status Bar
      <p> Score : ${this.model.score} High Score : ${this.model.scoreHistory}</p>
      </div>
    `;
  }
}
