import { API_KEY } from '../../config';

const fetchArticles = (event) => {
   return fetch(
      `http://content.guardianapis.com/search?q=${event}&api-key=fdc4c5fc-81bc-492b-9d9c-00b572e1b889`
   ).then((response) => response.json());
};

export default fetchArticles;
