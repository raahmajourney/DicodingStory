import StoryModel from '../../data/story-model';
import DetailView from './detail-view';

const DetailPresenter = {
  async init(id) {
    try {
      const response = await StoryModel.getStoryDetail(id);
      const story = response.story;
      DetailView.renderDetail(story);
    } catch (error) {
      DetailView.renderError(error.message);
    }
  }
};

export default DetailPresenter;
