import LoginPresenter from './login-presenter.js';

export default class LoginPage {
  async render() {
    return `
      <section class="login-container" id="main-content">
        <h1>Masuk ke Aplikasi</h1>

        <form id="loginForm" class="form-box">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="contoh@email.com" required>
          </div>

          <div class="form-group">
            <label for="password">Kata Sandi:</label>
            <input type="password" id="password" name="password" placeholder="Minimal 8 karakter" minlength="8" required>
          </div>

          <button type="submit" class="submit-button">Masuk</button>
        </form>

        <p class="register-hint">Belum punya akun? <a href="#/register">Daftar di sini</a></p>
      </section>
    `;
  }

  async afterRender() {
    await LoginPresenter.init({
      onSuccess: (message) => {
        alert(message);
        window.location.hash = '#/';
      },
      onError: (errorMessage) => {
        alert(errorMessage);
      },
    });
  }
}
