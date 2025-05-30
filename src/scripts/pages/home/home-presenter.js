import HomeModel from '../../data/home-model';
import HomeView from './home-view';
import { subscribePush, unsubscribePushHelper } from '../../utils/push-helper';

const HomePresenter = {
  async init({ storyContainer, subscriptionContainer }) {
    try {
      const stories = await HomeModel.getStories();
      const isSubscribed = await this._checkSubscriptionStatus();

      HomeView.renderAll({ storyContainer, subscriptionContainer, stories, isSubscribed });

      HomeView.initMap(stories);
      HomeView.bindDetailLinkAnimation();
      this._bindSubscriptionToggle({ storyContainer, subscriptionContainer });
    } catch (error) {
      HomeView.renderError(storyContainer, error.message);
    }
  },

  async _checkSubscriptionStatus() {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return Boolean(subscription);
  },

  _bindSubscriptionToggle({ storyContainer, subscriptionContainer }) {
    const button = document.querySelector('#subscription-btn');
    if (!button) return;

    button.addEventListener('click', async () => {
      try {
        const isSubscribed = await this._checkSubscriptionStatus();
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token tidak ditemukan');

        if (isSubscribed) {
          await unsubscribePushHelper();
          alert('Berhasil berhenti berlangganan.');
        } else {
          await subscribePush(token);
          alert('Berhasil berlangganan notifikasi.');
        }

        // Re-render ulang tampilan
        const stories = await HomeModel.getStories();
        const newStatus = await this._checkSubscriptionStatus();
        HomeView.renderAll({ storyContainer, subscriptionContainer, stories, isSubscribed: newStatus });
        HomeView.initMap(stories);
        HomeView.bindDetailLinkAnimation();

        this._bindSubscriptionToggle({ storyContainer, subscriptionContainer });
      } catch (err) {
        alert(err.message || 'Gagal memproses permintaan.');
        console.error(err);
      }
    });
  },
};

export default HomePresenter;
