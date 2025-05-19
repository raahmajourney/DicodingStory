// data/story-model.js
import { getStoryDetail, postStory } from './api';

const StoryModel = {
  async getStoryDetail(id) {
    return await getStoryDetail(id);
  },

  async postStory(data) {
    return await postStory(data);
  },
};



export default StoryModel;
