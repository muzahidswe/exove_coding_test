// Create a comic book reader/image browser or a carousel
// Create a comic book reader/image browser or a carousel with React. Use images from this document or your own. Continued in question 3B. Using TypeScript is recommended.

import React, { useState } from "react";

function ImageBrowser() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg"
  ];

  const prevImage = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(images.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const nextImage = () => {
    if (currentImageIndex === images.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div>
      <img src={images[currentImageIndex]} alt="Comic Image" />
      <button onClick={prevImage}>Previous</button>
      <button onClick={nextImage}>Next</button>
    </div>
  );
}

export default ImageBrowser;