import { VAPID_PUBLIC_KEY } from '../config';

/**
 * Konversi public key VAPID dari base64 menjadi Uint8Array
 * agar bisa digunakan oleh pushManager.subscribe
 */
const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

/**
 * Lakukan subscribe ke push notification
 * dan kirim hasil subscription ke API Dicoding
 */
const subscribePush = async (token) => {
  try {
    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    // Hanya ambil data yang diperlukan (tanpa expirationTime)
    const cleanSubscription = {
      endpoint: subscription.endpoint,
      keys: subscription.toJSON().keys,
    };

    const response = await fetch('https://story-api.dicoding.dev/v1/notifications/subscribe', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cleanSubscription),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Subscribe Push Error:', error);
    throw error;
  }
};

/**
 * Tampilkan notifikasi lokal setelah membuat story
 */
const showLocalNotification = (description) => {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification('Story berhasil dibuat', {
        body: `Anda telah membuat story baru dengan deskripsi: ${description}`,
        icon: '/icons/icon-192x192.png', // optional: ikon notifikasi
        vibrate: [100, 50, 100],          // optional: getaran
      });
    });
  }
};


export const unsubscribePushHelper = async () => {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    throw new Error('Kamu belum berlangganan notifikasi.');
  }

  await subscription.unsubscribe(); // Hapus dari browser
  await unsubscribePush();         // Hapus dari server (API)
};

const unsubscribePush = async () => {
  const token = localStorage.getItem('token');
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    throw new Error('Tidak ada subscription yang ditemukan di browser.');
  }

  const body = JSON.stringify({
    endpoint: subscription.endpoint, // 🟢 Ini penting sesuai dokumentasi
  });

  const response = await fetch(`${CONFIG.BASE_URL}/notifications/subscribe`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // 🟢 Header wajib
    },
    body,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Gagal unsubscribe dari server.');
  }

  return result;
};



export { subscribePush, showLocalNotification,  };
