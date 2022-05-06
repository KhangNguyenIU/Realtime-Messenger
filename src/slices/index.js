import authReducer from './Auth/auths.slice';
import notidicationReducer from './Common/notification.slice';
import socketSlice from './Socket/socket.slice';
const reducers = {
  auth: authReducer,
  notification: notidicationReducer,
  socket: socketSlice
};

export default reducers;
