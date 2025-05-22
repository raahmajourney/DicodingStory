// src/pages/home/home-presenter.js
import HomeModel from '../../data/home-model';
import HomeView from './home-view';

const HomePresenter = {
  async init({ container }) {
    try {
      const stories = await HomeModel.getStories();

      container.innerHTML = HomeView.renderStories(stories);
      HomeView.initMap(stories);
      HomeView.bindDetailLinkAnimation();
    } catch (error) {
      HomeView.renderError(container, error.message);
    }
  },
};

export default HomePresenter;
