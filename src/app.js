import {
  Question
} from './question.js';
import {
  isValid
} from './utils.js';
import {
  createModal
} from './utils.js';
import {
  getAuthForm
} from './auth.js';
import {
  AuthWithEmailAndPassword
} from './auth.js';

import './style.css';

const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');
const modalBtn = document.getElementById('modal-btn');

window.addEventListener('load', Question.renderList);
form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', () => {
  submitBtn.disabled = !isValid(input.value)
});
modalBtn.addEventListener('click', openModal);

function submitFormHandler(event) {
  event.preventDefault();
  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON()
    };

    submitBtn.disabled = true;
    Question.create(question).then(() => {
      console.log('Question', question);
      input.value = '';
      input.className = '';
      submitBtn.disabled = false;
    });
  };
};

function authFormHandler(event) {
  event.preventDefault();
  const btn = event.target.querySelector('button')
  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;

  btn.disabled = true;
    AuthWithEmailAndPassword(email, password)
    .then(token => {
      return Question.fetch(token)
    })
    .then(renderModalAfterAuth)
    .then( () => btn.disabled = false)
}

function renderModalAfterAuth(content) {
  console.log('Content', content)
  if (typeof (content) === 'string') {
    createModal('Ошибка!', content)
  }
  else{
    createModal('Список вопросов!', Question.listToHTML(content))
  }
  }

function openModal() {
  createModal("Авторизация", getAuthForm());
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler, {
      once: true
    })
}