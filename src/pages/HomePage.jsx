import { LandingComponent } from 'components/Landing';
import React from 'react';
// import { useSelector } from 'react-redux';

const HomePage = ({socket}) => {
//   const user = useSelector((state) => state.auth);
  return (
    <React.Fragment>
      <LandingComponent socket={socket}/>
    </React.Fragment>
  );
};

export default HomePage;
