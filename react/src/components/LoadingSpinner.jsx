import React from 'react';
import { RingLoader } from 'react-spinners';

const spinnerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '60vh', // Adjust the height as needed
};

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <RingLoader
        css={spinnerStyle}
        size={150} // Customize the size as needed
        color="#3EB075" // Customize the color
        loading={true} // Show the spinner
      />
    </div>
  );
};

export default LoadingSpinner;
