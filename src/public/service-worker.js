self.addEventListener('push', function(event) {
  const data = event.data?.json() || {};
  const title = data.title || 'Notifikasi';
  const options = data.options || {
    body: 'Anda mendapatkan notifikasi baru.',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
