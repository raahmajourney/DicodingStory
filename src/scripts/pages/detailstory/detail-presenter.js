import StoryModel from '../../data/story-model';
import DetailView from './detail-view';

const DetailPresenter = {
  async init(id) {
    try {
      const response = await StoryModel.getStoryDetail(id);
      const story = response.story;
      DetailView.renderDetail(story);
      return story;
    } catch (error) {
      DetailView.renderError(error.message);
      return null; 
    }
  }
};

export default DetailPresenter;
