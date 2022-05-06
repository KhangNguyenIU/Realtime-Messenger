import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from 'utils';

/**
 * @author
 * @function PrivateRoute
 **/

const PrivateRoute = ({ children }) => {

  let isAuth = true;
  (async () => {
    isAuth = await isAuthenticated();
  })();

  return isAuth ? children : <Navigate to="/auth" replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

export default PrivateRoute;
