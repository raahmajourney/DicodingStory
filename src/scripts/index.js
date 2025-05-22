// CSS imports
import '../styles/styles.css';


import App from './pages/app';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const logoutLink = document.querySelector('#logout-link');

  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();

      const confirmLogout = confirm('Apakah Anda yakin ingin keluar?');
      if (confirmLogout) {
        // Hapus token dari localStorage
        localStorage.removeItem('token');

        // Redirect ke halaman login atau beranda
        window.location.hash = '/login';
        alert('Anda telah berhasil logout.');
      }
    });
  }
});

function updateNavigation() {
  const token = localStorage.getItem('token');
  const loginLink = document.querySelector('a[href="#/login"]');
  const logoutLink = document.querySelector('#logout-link');
   const addStoryLink = document.querySelector('#addstory-link');


  if (token) {
    loginLink.style.display = 'none';
    logoutLink.style.display = 'block';
    addStoryLink.style.display = 'block';
  } else {
    loginLink.style.display = 'block';
    logoutLink.style.display = 'none';
    addStoryLink.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateNavigation(); // panggil saat pertama
  window.addEventListener('hashchange', updateNavigation); // panggil saat navigasi berubah
});


