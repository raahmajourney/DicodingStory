import RegisterPresenter from './register-presenter';

export default class RegisterPage {
  async render() {
    return `
      <section class="register-container" id="main-content">
        <h1>Daftar Akun</h1>

        <form id="registerForm" class="form-box">
          <div class="form-group">
            <label for="name">Nama Lengkap:</label>
            <input type="text" id="name" name="name" placeholder="Nama Anda" required>
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="contoh@email.com" required>
          </div>

          <div class="form-group">
            <label for="password">Kata Sandi:</label>
            <input type="password" id="password" name="password" placeholder="Minimal 8 karakter" minlength="8" required>
          </div>

          <button type="submit" class="submit-button">Daftar</button>
        </form>

        <p class="register-hint">Sudah punya akun? <a href="#/login">Masuk di sini</a></p>
      </section>
    `;
  }

  async afterRender() {
    RegisterPresenter.init({
      onSuccess: (message) => {
        alert(`Berhasil daftar: ${message}`);
        window.location.hash = '#/login';
      },
      onError: (errorMessage) => {
        alert(`Gagal daftar: ${errorMessage}`);
      },
    });
  }
}
