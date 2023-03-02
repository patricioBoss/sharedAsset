import axios from 'axios';

export const getUserById = (url) => axios.get(url).then((res) => res.data.data);
