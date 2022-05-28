import 'styles/style.scss';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from 'slices/Auth/auths.slice';
import HomePage from 'pages/HomePage';
import { MessagePage } from 'pages/Message/MessagePage';
import PrivateRoute from 'components/Auth/PrivateRoute';
import { Notification } from 'components/Common/Notification';
import { AuthPage } from './pages/AuthPage';
import { GlobalSound } from 'components/Common/Sound';
import Loading from 'components/Common/Loading';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      try {
        const action = authenticateUser();
        dispatch(action);
      } catch (error) {
        window.location.href('/');
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const connectionOptions = {
        "force new connection": true,
        reconnectionAttempts: "Infinity",
        timeout: 10000,
        transports: ["websocket"],
      };
    const newSocket = io(process.env.REACT_APP_SOCKET_URL, connectionOptions);
    setSocket(newSocket);
  }, [setSocket]);

  return (
    <>
      {/* Routes */}
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<PrivateRoute condition={false} redirect='/'><AuthPage /></PrivateRoute>} />
          <Route path="/" element={<HomePage socket={socket} />} />
          <Route
            path="/message"
            element={
              <PrivateRoute condition={true}>
                <MessagePage socket={socket} />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      {/* HOC component*/}
      <Notification />
      <GlobalSound />
      <Loading/>
    </>
  );
}

export default App;
