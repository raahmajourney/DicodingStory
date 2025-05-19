import { getAllStories } from './api';

const HomeModel = {
  async getStories() {
    const response = await getAllStories(true);
    

    if (response.error) {
      throw new Error(response.message || 'Gagal mengambil data story');
    }

    return response.listStory;
  },
};

export default HomeModel;
