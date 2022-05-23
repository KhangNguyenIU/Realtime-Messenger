import React, { useEffect, useState } from 'react';
import messageService from 'services/message/message.service';

/**
 * @author
 * @function LandingComponent
 **/

export const LandingComponent = ({ socket }) => {



  return (
    <div className="main">
      <div className="left" style={{ zIndex: '9999' }}>
        {/* <input type="file" onChange={onLoadImage}/>
        <button onClick={handleSubmit}>Submit</button> */}
      </div>
      <div className="right">
        {/* <svg class="placeholder" width="528" height="396" viewBox="0 0 528 396">
          <rect width="528" height="396" style={{fill:"transparent"}} />
        </svg> */}
        <div className="abstract">
          <div
            className="hero-figure-box hero-figure-box-01"
            data-rotation="45deg"
          ></div>
        </div>
      </div>
    </div>
  );
};
