// scripts/data/register-model.js
import { register } from './api';

const RegisterModel = {
  async registerUser({ name, email, password }) {
    const response = await register({ name, email, password });

    if (response.error) {
      throw new Error(response.message || 'Registrasi gagal');
    }

    return response;
  },
};

export default RegisterModel;
