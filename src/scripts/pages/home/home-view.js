// src/pages/home/home-view.js
const HomeView = {
  renderStories(stories) {
    return stories.map((story) => `
      <article class="story-card">
        <img src="${story.photoUrl}" alt="${story.name}" class="story-image"/>
        <div class="story-content">
          <h3>${story.name}</h3>
          <p>${story.description}</p>
          <small>${new Date(story.createdAt).toLocaleString()}</small>
          <p class="story-location">
            ${story.lat && story.lon ? `📍 ${story.lat}, ${story.lon}` : 'Lokasi tidak tersedia'}
          </p>
          <a href="#/detail/${story.id}" class="detail-link" data-id="${story.id}">Lihat Detail</a>
          ${story.lat && story.lon ? `<div id="map-${story.id}" class="story-map"></div>` : ''}
        </div>
      </article>
    `).join('');
  },

  renderSubscriptionButton(isSubscribed) {
    return `
      <section class="unsubscribe-section">
        <button id="subscription-btn" class="btn-subscription">
          ${isSubscribed ? 'Unsubscribe' : 'Subscribe'}
        </button>
      </section>
    `;
  },

  renderAll({ storyContainer, subscriptionContainer, stories, isSubscribed }) {
    subscriptionContainer.innerHTML = this.renderSubscriptionButton(isSubscribed);
    storyContainer.innerHTML = this.renderStories(stories);
  },

  renderError(container, message) {
    container.innerHTML = `<p class="error-message">${message}</p>`;
  },

  initMap(stories) {
    const map = L.map('map').setView([-2.5, 118], 4);
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const storyMarkers = L.layerGroup();
    stories.forEach((story) => {
      if (story.lat && story.lon) {
        const marker = L.marker([story.lat, story.lon]).bindPopup(`<b>${story.name}</b><br>${story.description}`);
        storyMarkers.addLayer(marker);
      }
    });

    storyMarkers.addTo(map);
    L.control.layers({ "OpenStreetMap": osm }, { "Cerita Marker": storyMarkers }).addTo(map);

    requestAnimationFrame(() => map.invalidateSize());
  },

  bindDetailLinkAnimation() {
    document.querySelectorAll('.detail-link').forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const href = link.getAttribute('href');
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            window.location.hash = href;
          });
        } else {
          window.location.hash = href;
        }
      });
    });
  },
};

export default HomeView;
