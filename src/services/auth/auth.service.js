import axiosClient from 'services/axiosClient';

const authService = {
  login(data) {
    const url = '/auth/login';
    return axiosClient.post(url, data);
    // .then(res => res.data).catch(err => console.log(err.response));
  },
  getAuthUser() {
    const url = '/auth/authenticate';
    return axiosClient.post(url);
  },
  logout() {
    localStorage.removeItem('token');
  },
};

export default authService;
