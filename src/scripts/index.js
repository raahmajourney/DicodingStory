import '../styles/styles.css';
import App from './pages/app';
import { registerSW } from 'virtual:pwa-register';
import { subscribePush } from './utils/push-helper'; // atau sesuaikan path-nya


document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();


  // ✅ Minta izin notifikasi
  if ('Notification' in window && 'serviceWorker' in navigator) {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = localStorage.getItem('token');
      if (token) {
        subscribePush(token)
          .then((res) => console.log('Push Subscription Success:', res))
          .catch((err) => console.error('Push Subscription Failed:', err));
      }
    } else {
      console.warn('Notification permission denied');
    }
  }

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


// main.js atau entry point app kamu
 // if ('serviceWorker' in navigator && 'PushManager' in window) {
  //  window.addEventListener('load', () => {
  //    navigator.serviceWorker.register('/service-worker.js')
 // //      .then(() => console.log('Service Worker registered'))
 //       .catch(err => console.error('Service Worker registration failed:', err));
 //   });
 // }

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Update tersedia. Muat ulang sekarang?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App siap digunakan secara offline');
  },
});