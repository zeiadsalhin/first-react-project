import React from 'react';
import  Lottie  from 'lottie-react';
import animationData from '../assets/animation.json'; // Import your Lottie JSON

const LottieAnimation = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie animationData={animationData} loop={true} autoplay={true} />
    </div>
  );
};

export default LottieAnimation;
