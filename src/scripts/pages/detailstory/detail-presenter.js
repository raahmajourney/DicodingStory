import StoryModel from '../../data/story-model';

const DetailPresenter = {
  async init({ id, container, onError }) {
    try {
      const response = await StoryModel.getStoryDetail(id);

      const story = response.story;

      container.innerHTML = `
        <div class="story-item">
          <img src="${story.photoUrl}" alt="${story.name}" />
          <h2>${story.name}</h2>
          <p>${story.description}</p>
          <small>Created at: ${new Date(story.createdAt).toLocaleString()}</small>
        </div>
      `;

      if (story.lat && story.lon) {
        initMap(story.lat, story.lon, story.name);
      }

    } catch (error) {
      onError(error.message);
    }
  }
};

function initMap(lat, lon, name) {
  const map = L.map('map').setView([lat, lon], 13);

  // Tambahkan tile layer dari OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Tambahkan marker
  L.marker([lat, lon]).addTo(map)
    .bindPopup(`<b>${name}</b><br>Lokasi cerita ini.`)
    .openPopup();
}


export default DetailPresenter;
