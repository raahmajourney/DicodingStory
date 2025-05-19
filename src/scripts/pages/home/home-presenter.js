import HomeModel from '../../data/home-model';

const HomePresenter = {
  async init({ container, onError }) {
    try {
      const stories = await HomeModel.getStories();

      container.innerHTML = stories.map((story) => `
        <div class="story-card">
          <img src="${story.photoUrl}" alt="${story.name}" class="story-image"/>
          <div class="story-content">
            <h3>${story.name}</h3>
            <p>${story.description}</p>
            <small>${new Date(story.createdAt).toLocaleString()}</small>
            <p class="story-location">
              ${story.lat && story.lon ? `📍 ${story.lat}, ${story.lon}` : 'Lokasi tidak tersedia'}
            </p>
            <a href="#/detail/${story.id}" class="detail-link">Lihat Detail</a>

            <!-- Mini map per card -->
            ${story.lat && story.lon ? `<div id="map-${story.id}" class="story-map"></div>` : ''}
          </div>
        </div>
      `).join('');


     
      const mainMap = L.map('map').setView([-2.5, 118], 4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mainMap);

      requestAnimationFrame(() => {
       mainMap.invalidateSize();
      });

      stories.forEach((story) => {
        if (story.lat && story.lon) {
          L.marker([story.lat, story.lon])
            .addTo(mainMap)
            .bindPopup(`<b>${story.name}</b><br>${story.description}`);
        }
      });

   } catch (error) {
      onError(error.message);
    }
  },
};

export default HomePresenter;


