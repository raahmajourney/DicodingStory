// scripts/data/login-model.js

import { login } from './api';

const LoginModel = {
  async loginUser({ email, password }) {
    const response = await login({ email, password });

    if (response.error) {
      throw new Error(response.message || 'Login gagal');
    }

    // Simpan token dan nama user ke localStorage
    localStorage.setItem('token', response.loginResult.token);
    localStorage.setItem('userName', response.loginResult.name);
    localStorage.setItem('userId', response.loginResult.userId);

    return response;
  },
};

export default LoginModel;
