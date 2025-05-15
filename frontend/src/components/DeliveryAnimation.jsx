import React from 'react';

export default function DeliveryAnimation() {
  return (
    <div className="flex justify-center items-center w-full h-full p-4">
      <img
        src={require('../assets/delivery-man.gif')}
        alt="Animated delivery person"
        loading="lazy"
        className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full h-auto rounded-md shadow-md"
      />
    </div>
  );
}
