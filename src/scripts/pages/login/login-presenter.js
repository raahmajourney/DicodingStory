import LoginModel from '../../data/login-model';
import LoginView from './login-view';
import { subscribeUserToPush } from '../../utils/push-helper';

const LoginPresenter = {
  async init({ onSuccess, onError }) {
    const { form, emailInput, passwordInput } = LoginView.getFormElements();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      try {
        const result = await LoginModel.loginUser({ email, password });

        await initPush();

        onSuccess(result.message);
      } catch (error) {
        onError(error.message || 'Gagal masuk. Silakan coba lagi.');
      }
    });
  },
};

async function initPush() {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    await subscribeUserToPush();
  }
}

export default LoginPresenter;
