import axiosClient from 'services/axiosClient';

const userService = {
  getUsersList() {
    const url = '/user/user-list';
    return axiosClient.post(url);
    // .then(res => res.data).catch(err => console.log(err.response));
  }
  
};

export default userService;
