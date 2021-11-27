import axios from 'axios';

const API_KEY = '22469389-b601f8ee0455705c879309776';
const BASE_URL = 'https://pixabay.com/api';
axios.defaults.baseURL = BASE_URL;

export default class Gallery {
  constructor() {
    this.key = API_KEY;
    this.requestQuery = '';
    this.imageType = 'photo';
    this.orientation = 'horizontal';
    this.filter = true;
    this.page = '1';
    this.quantity = 40;
  }

  async getGalerry() {
    const response = await axios.get(
      `/?key=${API_KEY}&image_type=${this.imageType}&page=${this.page}&per_page=${this.quantity}&orientation=${this.orientation}&q=${this.requestQuery}&safesearch=${this.filter}`,
    );

    const { hits, totalHits } = await response.data;
    this.incrementPage();
    return { hits, totalHits };
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.requestQuery;
  }

  set query(newQuery) {
    this.requestQuery = newQuery;
  }
}
