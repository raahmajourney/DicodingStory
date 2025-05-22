import RegisterModel from '../../data/register-model';
import RegisterView from './register-view';

const RegisterPresenter = {
  async init({ onSuccess, onError }) {
    const { form, nameInput, emailInput, passwordInput } = RegisterView.getFormElements();

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      try {
        const result = await RegisterModel.registerUser({ name, email, password });
        onSuccess(result.message);
      } catch (error) {
        onError(error.message || 'Registrasi gagal');
      }
    });
  },
};

export default RegisterPresenter;
