import React, { useState } from 'react';
import Login from 'components/Auth/Login';
import  Register  from 'components/Auth/Register';

/**
 * @author
 * @function AuthPage
 **/

export const AuthPage = () => {
  //switch between login and register: 0 for login, 1 for register
  const [switchAuth, setSwitchAuth] = useState(0);
  return (
    <React.Fragment>
      {switchAuth === 0 ? (
        <Login setSwitchAuth={setSwitchAuth} />
      ) : (
        <Register setSwitchAuth={setSwitchAuth} />
      )}
    </React.Fragment>
  );
};
