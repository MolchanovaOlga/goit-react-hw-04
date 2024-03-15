import axios from 'axios';

const idAPI = '3ABtWRVdIJO46ffwj_MMAhTMfBgXLKP31Mw70DmKoiE';
const objUrlParams = {
  client_id: idAPI,
  total: 0,
  page: 1,
  per_page: 6,
  query: '',
};

const requestByKeyWord = async keyWord => {
  objUrlParams.query = `${keyWord}`;
  axios.defaults.baseURL = 'https://api.unsplash.com/';
  const response = await axios.get('search/photos/', {
    params: objUrlParams,
  });

  objUrlParams.total = response.data.total;
  return response.data;
};

export { requestByKeyWord, objUrlParams };
