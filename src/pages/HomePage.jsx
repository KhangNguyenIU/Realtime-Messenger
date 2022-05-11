import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const user = useSelector((state) => state.auth);
  console.log('home', user);
  return (
    <div>
      <div>HomePage</div>
      <img src="https://unsplash.com/photos/oJJ9WFl0q-I" alt="alt" />
      <div>
     
      </div>
    </div>
  );
};

export default HomePage;
