const RegisterView = {
  getFormElements() {
    const form = document.querySelector('#registerForm');

    return {
      form,
      nameInput: form.querySelector('#name'),
      emailInput: form.querySelector('#email'),
      passwordInput: form.querySelector('#password'),
    };
  },

  showAlert(message) {
    alert(message);
  },
};

export default RegisterView;
