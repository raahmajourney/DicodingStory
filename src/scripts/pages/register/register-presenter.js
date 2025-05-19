// scripts/pages/register/register-presenter.js

import RegisterModel from '../../data/register-model';

const RegisterPresenter = {
  async init({ onSuccess, onError }) {
    const form = document.querySelector('#registerForm');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value;

      try {
        const result = await RegisterModel.registerUser({ name, email, password });
        onSuccess(result.message);
      } catch (error) {
        onError(error.message);
      }
    });
  },
};

export default RegisterPresenter;
