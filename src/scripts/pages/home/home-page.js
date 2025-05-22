// src/pages/home/home-page.js
import HomePresenter from './home-presenter';

export default class HomePage {
  async render() {
    return `
      <main id="main-content" class="container" tabindex="-1">
        <h1>Stories</h1>
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
    await HomePresenter.init({ container: storyContainer });
  }
}
