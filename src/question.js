export class Question {
  static create(question) {
    return fetch('https://podcast--app-8c1d0-default-rtdb.firebaseio.com/question.json', {
        method: 'POST',
        body: JSON.stringify(question),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(response => {
        question.id = response.name
        return question
      })
      .then(addToLocalStorage)
      .then(Question.renderList)
  }

  static fetch(token) {
    if (!token) {
      return Promise.resolve(`<p class="error">У вас нет токена</p>`)
    }


    return fetch(`https://podcast--app-8c1d0-default-rtdb.firebaseio.com/question.json?auth=${token}`)
      .then(response => response.json())
      .then(response => {
        if (response && response.error) {
          return `<p class="error">${response.error}</p>`
        }
        console.log('Response', response);
        return response ?
          Object.keys(response).map(key => ({
            ...response[key],
            id: key
          })) :
          []
      })
  }

  static renderList() {
    const questions = getQuestionsFromLocalStorage();
    // console.log('questions', questions);
    // console.log('questions.length', questions.length);
    const html = questions.length ?
      questions.map(toCart).join(' ') :
      `<div class = "mui--text-headline"> Вы еще не спрашивали </div>`;

    const list = document.getElementById('list');
    list.innerHTML = html;
  }

static listToHTML(questions) {
  return questions.length
  ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join(' ') } </ol>`
  : `<p>Вопрсоов пока нет</p>`

}

}

function toCart(question) {
  return `<div class = "mui--text-black-54"> 
        ${new Date(question.date).toLocaleDateString()}
        ${new Date(question.date).toLocaleTimeString()}
        </div>
          <div> ${question.text}</div> <br>`
}

function addToLocalStorage(question) {
  const all = getQuestionsFromLocalStorage();
  // console.log('all', all);
  all.push(question);
  localStorage.setItem('question', JSON.stringify(all))
}

function getQuestionsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('question') || '[]');
}