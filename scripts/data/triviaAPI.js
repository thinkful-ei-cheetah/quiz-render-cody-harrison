'use strict';
/*global TrivaAPI,question,quiz,Model*/
class TrivaAPI {
  constructor(){
    this.Base_url ='https://opentdb.com/api.php';
  }
  getQuestions(amt= 10){
    const url = new URL(TrivaAPI.Base_url);
    url.searchParams.set('amount',amt);
    return fetch(url)
      .then(res => res.json());
  }
}

// trivaAPI.url ='https://opentdb.com/api.php?amount=10';