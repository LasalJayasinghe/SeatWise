import React, { useState } from 'react';

const Slideshow = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleNextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
  };

  return (
    <div className="slideshow">
      <img src={images[currentImage]} alt="Slideshow Image" />
      <button onClick={handlePreviousImage}>Previous</button>
      <button onClick={handleNextImage}>Next</button>
    </div>
  );
};

export default Slideshow;
