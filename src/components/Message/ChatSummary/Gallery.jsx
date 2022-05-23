import React from 'react';

import useComponentSize from 'hooks/useComponentSize';
/**
 * @author
 * @function Gallery
 **/

export const Gallery = ({ parentRef }) => {
//   console.log(parentRef);
  const { width, height } = useComponentSize(parentRef);
//   console.log({ width, height });
  return (
    <React.Fragment>
      <div className="item">
        <img
          src="https://source.unsplash.com/random"
          width={width / 2 - 10}
          height={height / 2}
        />
      </div>
      <div className="item">
        <img
          src="https://source.unsplash.com/random"
          width={width / 2 - 10}
          height={height / 2}
        />
      </div>
      <div className="item">
        <img
          src="https://source.unsplash.com/random"
          width={width / 2 - 10}
          height={height / 2}
        />
      </div>
      <div className="item">
        <img
          src="https://source.unsplash.com/random"
          width={width / 2 - 10}
          height={height / 2}
        />
      </div>
    </React.Fragment>
  );
};
