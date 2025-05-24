import DetailPresenter from './detail-presenter';

export default class DetailPage {
  async render() {
    return `
      <a href="#main-content" class="skip-link">Lewati ke Konten</a>
      <main id="main-content" class="container" tabindex="-1">
        <h1>Detail Story</h1>
        <div id="storyDetail" class="story-detail"></div>
        <section class="container" aria-labelledby="map-heading">
          <h2 id="map-heading">Lokasi Cerita</h2>
          <div id="map" style="height: 400px;" aria-label="Peta lokasi cerita"></div>
        </section>
      </main>
    `;
  }

  async afterRender() {
    const hash = window.location.hash;
    const id = hash.split('/')[2];

    await DetailPresenter.init(id);
  }
}
