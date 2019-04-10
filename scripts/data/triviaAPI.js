'use strict';
/*global TrivaAPI,question,quiz,Model*/
// class TriviaAPI {
//   constructor(){
//     this.Base_url ='https://opentdb.com/api.php';
//   }
//   getQuestions(amt= 10){
//     const url = new URL(TriviaAPI.Base_url);
//     url.searchParams.set('amount',amt);
//     return fetch(url)
//       .then(res => res.json());
//   }
// }
class TriviaApi {
  static BASE_URL = 'https://opentdb.com/api.php';

  // Warning! No error handling implemented -- assume will always receive JSON response
  fetchQuestions(amt = 10) {
    const url = new URL(TriviaApi.BASE_URL);
    url.searchParams.set('amount', amt);
    return fetch(url)
      .then(res => res.json());
  }
}

// trivaAPI.url ='https://opentdb.com/api.php?amount=10';