const DetailView = {
  renderDetail(story) {
    const container = document.querySelector('#storyDetail');
    container.innerHTML = `
      <article class="story-item">
        <img src="${story.photoUrl}" alt="${story.name}" />
        <h2>${story.name}</h2>
        <p>${story.description}</p>
        <small>Created at: ${new Date(story.createdAt).toLocaleString()}</small>
      </article>
    `;

    if (story.lat && story.lon) {
      this.initMap(story.lat, story.lon, story.name);
    }
  },

  renderError(message) {
    const container = document.querySelector('#storyDetail');
    container.innerHTML = `<p class="error-message">${message}</p>`;
  },

  initMap(lat, lon, name) {
    const map = L.map('map').setView([lat, lon], 13);

    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    });

    const maptiler = L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=YOUR_MAPTILER_KEY', {
      attribution: '&copy; <a href="https://www.maptiler.com">MapTiler</a>',
      tileSize: 512,
      zoomOffset: -1,
    });

    const stamen = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
      attribution: 'Map tiles by <a href="https://stamen.com">Stamen Design</a>',
    });

    osm.addTo(map);

    const marker = L.marker([lat, lon])
      .addTo(map)
      .bindPopup(`<b>${name}</b><br>Lokasi cerita ini.`)
      .openPopup();

    L.control.layers({
      "OpenStreetMap": osm,
      "MapTiler Streets": maptiler,
      "Stamen Toner": stamen,
    }, {
      "Lokasi Cerita": marker,
    }).addTo(map);

    requestAnimationFrame(() => {
      map.invalidateSize();
    });
  }
};

export default DetailView;
