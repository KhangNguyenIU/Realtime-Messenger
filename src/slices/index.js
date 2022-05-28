import authReducer from './Auth/auths.slice';
import notidicationReducer from './Common/notification.slice';
import socketSlice from './Socket/socket.slice';
import soundReducer from './Common/sound.slice'
import loadingReducer from './Common/loading.slice'

const reducers = {
  auth: authReducer,
  notification: notidicationReducer,
  sound: soundReducer,
  socket: socketSlice,
  loading: loadingReducer,
};

export default reducers;
