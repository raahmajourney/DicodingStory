import FavoriteStoryIdb from '@/db/favorite-story-idb';
import HomeView from '../home/home-view';

class FavoritePage {
  async render() {
    return `
      <main id="main-content" class="container" tabindex="-1">
        <h1>Daftar Cerita Favorit</h1>
        <div id="favorite-list" class="story-list"></div>
      </main>
    `;
  }

  async afterRender() {
    const favorites = await FavoriteStoryIdb.getAll();
    const container = document.getElementById('favorite-list');

    container.innerHTML = '';

    if (favorites.length === 0) {
      container.innerHTML = '<p>Tidak ada cerita favorit.</p>';
      return;
    }

    // Render HTML cerita favorit
    container.innerHTML = HomeView.renderStories(favorites);

    // Hapus tautan "Lihat Detail"
    container.querySelectorAll('.detail-link').forEach(link => link.remove());

    // Tambahkan tombol hapus ke setiap cerita
    favorites.forEach((story, index) => {
      const card = container.querySelectorAll('article')[index];
      if (card) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Hapus dari Favorit';
        deleteBtn.classList.add('delete-button');
        deleteBtn.setAttribute('data-id', story.id);

        card.querySelector('.story-content')?.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', async () => {
          await FavoriteStoryIdb.delete(story.id);
          alert('Cerita dihapus dari favorit!');
          // Render ulang daftar favorit setelah hapus
          this.afterRender();
        });
      }
    });

    HomeView.bindDetailLinkAnimation();
  }
}

export default FavoritePage;
