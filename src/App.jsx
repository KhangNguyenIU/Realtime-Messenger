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
    const newSocket = io(process.env.REACT_APP_SOCKET_URL, {
      withCredentials: true,
      transportOptions: {
        polling: {
          extraHeaders: {
            secretHeader: 'abcd',
          },
        },
      },
    });
    setSocket(newSocket);
  }, [setSocket]);

  return (
    <>
      {/* Routes */}
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<AuthPage />} />
          <Route path="/" element={<HomePage socket={socket} />} />
          <Route
            path="/message"
            element={
              <PrivateRoute user={user}>
                <MessagePage socket={socket} />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      {/* HOC component*/}
      <Notification />
      <GlobalSound />
    </>
  );
}

export default App;
