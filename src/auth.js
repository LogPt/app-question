export function getAuthForm() {
  return `
          <form class="mui-form" id="auth-form">
          <div class="mui-textfield mui-textfield--float-label">
            <input type="email" id="email" required>
            <label for="email" >Email</label>
          </div>
          <div class="mui-textfield mui-textfield--float-label">
            <input type="password" id="password" required>
            <label for="password">Пароль</label>
          </div>
          <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary">
            Войти
          </button>
          <div>
          <p>Для demo-входа введите:</p>
          <p>login: qaz@mail.ru</p>
          <p>password: 123456789</p>
          </div>
        </form>
        `
};

export function AuthWithEmailAndPassword(email, password) {
  const apiKey = 'AIzaSyDNIZ1ceMKaGTaaMUyjWPBoSnPN3kD0Z7k';
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => data.idToken)


}