import HomePresenter from './home-presenter';

export default class HomePage {
  async render() {
    return `
      <section class="container" id="main-content">
      <h1>Stories</h1>
      <div id="storyList" class="story-list"></div>
    </section>
    <br>
   <section class="container" aria-labelledby="map-heading">
    <h2 id="map-heading">Lokasi Cerita</h2>
    <div class="map-card">
      <div id="map" style="height: 400px;" aria-label="Peta lokasi cerita"></div>
    </div>
  </section>

    `;
  }

  async afterRender() {
    // Do your job here
     const storyContainer = document.querySelector('#storyList');

    await HomePresenter.init({
      container: storyContainer,
      onError: (message) => {
        storyContainer.innerHTML = `<p class="error-message">${message}</p>`;
      },
    });
  }

  
}
