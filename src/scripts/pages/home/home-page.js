// src/pages/home/home-page.js
import HomePresenter from './home-presenter';
import HomeView from './home-view';

export default class HomePage {
  async render() {
    return `
      <main id="main-content" class="container" tabindex="-1">
        <h1>Stories</h1>
        <div id="subscription-container"></div>
        <div id="storyList" class="story-list"></div>
        <section class="container" aria-labelledby="map-heading">
          <h2 id="map-heading">Lokasi Cerita</h2>
          <div class="map-card">
            <div id="map" style="height: 400px;" aria-label="Peta lokasi cerita"></div>
          </div>
        </section>
      </main>
    `;
  }

  async afterRender() {
    const storyContainer = document.querySelector('#storyList');
    const subscriptionContainer = document.querySelector('#subscription-container');
    await HomePresenter.init({ storyContainer, subscriptionContainer });
  }
}
