import LoginModel from '../../data/login-model';
import LoginView from './login-view';

const LoginPresenter = {
  async init({ onSuccess, onError }) {
    const { form, emailInput, passwordInput } = LoginView.getFormElements();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      try {
        const result = await LoginModel.loginUser({ email, password });
        onSuccess(result.message);
      } catch (error) {
        onError(error.message || 'Gagal masuk. Silakan coba lagi.');
      }
    });
  },
};

export default LoginPresenter;
