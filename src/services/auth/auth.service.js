import axiosClient from 'services/axiosClient';

const authService = {
  login(data) {
    const url = '/auth/login';
    return axiosClient.post(url, data);
    // .then(res => res.data).catch(err => console.log(err.response));
  },
  signup(data){
    const url = '/auth/register';
    return axiosClient.post(url, data);
  },
  getAuthUser() {
    const url = '/auth/authenticate';
    return axiosClient.post(url);
  },
  logout() {
    localStorage.removeItem('token');
    return true
  },
};

export default authService;
