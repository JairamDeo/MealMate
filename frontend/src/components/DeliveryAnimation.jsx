import React from 'react';
import '../App.css'; // Create this CSS file for styling.

export default function DeliveryAnimation() {
  return (
    <div className="delivery-animation">
      <img
        src={require('../assets/delivery-man.gif')} // Adjust the path if needed
        alt="Delivery Animation"
        className="delivery-image"
      />
    </div>
  );
}
