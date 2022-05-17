import React, { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated } from 'utils';
import { useSelector } from 'react-redux';

/**
 * @author
 * @function PrivateRoute
 **/

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate()

    useLayoutEffect(() => {
        (async()=>{
            const auth = await isAuthenticated()
            if(!auth){
                navigate('/auth')
            }
        })()
    }, [navigate]);

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

export default PrivateRoute;
