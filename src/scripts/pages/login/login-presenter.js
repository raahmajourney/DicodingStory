// scripts/pages/login/login-presenter.js

import LoginModel from '../../data/login-model';

const LoginPresenter = {
  async init({ onSuccess, onError }) {
    const form = document.querySelector('#loginForm');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = form.email.value.trim();
      const password = form.password.value;

      try {
        const result = await LoginModel.loginUser({ email, password });
        onSuccess(result.message);
      } catch (error) {
        onError(error.message);
      }
    });
  },
};

export default LoginPresenter;
