import DetailPresenter from './detail-presenter';
import FavoriteStoryIdb from '@/db/favorite-story-idb';

export default class DetailPage {
  async render() {
    return `
      <a href="#main-content" class="skip-link">Lewati ke Konten</a>
      <main id="main-content" class="container" tabindex="-1">
        <h1>Detail Story</h1>
        <div id="storyDetail" class="story-detail"></div>
        <div class="button-group">
          <button id="save-favorite">Simpan ke Favorit</button>
        </div>
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

    const story = await DetailPresenter.init(id);
    if (!story) return;

    document.getElementById('save-favorite').addEventListener('click', async () => {
      await FavoriteStoryIdb.put(story);
      alert('Disimpan ke favorit!');
    });

    document.getElementById('delete-favorite').addEventListener('click', async () => {
      await FavoriteStoryIdb.delete(story.id);
      alert('Dihapus dari favorit!');
    });
  }
}
