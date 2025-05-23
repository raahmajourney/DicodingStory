import AddStoryPresenter from './add-story-presenter';

export default class AddStoryPage {
  async render() {
    return `
      <section class="addstory-container" id="main-content">
        <h1>Tambah Cerita</h1>
        <form id="storyForm" enctype="multipart/form-data" class="form-box">
          <div class="form-group">
            <label for="description">Deskripsi Cerita:</label>
            <textarea id="description" name="description" rows="4" required></textarea>
          </div>
          <div class="form-group">
            <label for="photo">Unggah Gambar:</label>
            <input type="file" id="photo" name="photo" accept="image/*" required>
            <br>
            <small>Atau gunakan kamera di bawah</small>
          </div>

         <div class="form-group">
          <video id="camera" autoplay muted playsinline style="width: 100%; display: none;"></video>
          <canvas id="canvas" style="display: none;"></canvas>
          <img id="photoPreview" style="width: 100%; display: none; margin-top: 1rem;" alt="Preview Foto"/>
          <button type="button" id="capture-button" class="btn btn-primary" style="margin-top: 0.5rem;">
            📷 Nyalakan Kamera
          </button>
        </div>

          <div class="form-group">
            <label for="map">Klik pada peta untuk menandai lokasi:</label>
            <div id="map" style="height: 250px;"></div>
            <input type="hidden" id="lat" name="lat">
            <input type="hidden" id="lon" name="lon">
          </div>
          <button type="submit" class="submit-button">Kirim Cerita</button>
        </form>
      </section>
    `;
  }

   async afterRender() {
    this._initializeMap();
    this._presenter = new AddStoryPresenter();

    window.addEventListener('hashchange', this._onPageChange);
    window.addEventListener('beforeunload', this._onPageChange); // optional untuk refresh
  }

  _initializeMap() {
    const map = L.map('map').setView([-6.2, 106.816666], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    let marker;
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        marker = L.marker([lat, lng]).addTo(map);
      }
      document.querySelector('#lat').value = lat;
      document.querySelector('#lon').value = lng;
    });
  }

  _onPageChange = () => {
    if (this._presenter) {
      this._presenter.destroy();
    }

    window.removeEventListener('hashchange', this._onPageChange);
    window.removeEventListener('beforeunload', this._onPageChange);
  };
  
}
