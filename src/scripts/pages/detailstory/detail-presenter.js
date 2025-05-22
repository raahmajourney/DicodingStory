
import StoryModel from '../../data/story-model';
import DetailView from './detail-view';

const DetailPresenter = {
  async init({ id, container }) {
    try {
      const response = await StoryModel.getStoryDetail(id);
      const story = response.story;

      container.innerHTML = DetailView.renderDetail(story);

      if (story.lat && story.lon) {
        DetailView.initMap(story.lat, story.lon, story.name);
      }

    } catch (error) {
      DetailView.renderError(container, error.message);
    }
  }
};

export default DetailPresenter;
