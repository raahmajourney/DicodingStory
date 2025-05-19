import DetailPresenter from './detail-presenter';

export default class DetailPage {
  async render() {
    return `
      <section class="container" id="main-content">
        <h1>Detail story</h1>
        <div id="storyDetail" class="story-detail"></div>

        <section class="container" aria-labelledby="map-heading">
          <h2 id="map-heading">Lokasi Cerita</h2>
          <div id="map" style="height: 400px;" aria-label="Peta lokasi cerita"></div>
        </section>
      </section>
    `;
  }

  async afterRender() {
    const storyContainer = document.querySelector('#storyDetail');
    const hash = window.location.hash;
    const id = hash.split('/')[2]; // ambil id dari URL hash

    await DetailPresenter.init({
      id,
      container: storyContainer,
      onError: (message) => {
        storyContainer.innerHTML = `<p class="error-message">${message}</p>`;
      },
    });
  }
}
