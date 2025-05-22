const LoginView = {
  getFormElements() {
    const form = document.querySelector('#loginForm');

    return {
      form,
      emailInput: form.querySelector('#email'),
      passwordInput: form.querySelector('#password'),
    };
  },

  showAlert(message) {
    alert(message);
  },
};

export default LoginView;
