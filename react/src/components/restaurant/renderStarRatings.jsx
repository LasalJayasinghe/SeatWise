import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';

export default function renderStarRating(params) {
  const { value } = params;
  
  // Define how to render star icons based on the rating value
  const starIcons = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= value) {
      starIcons.push(
        <StarIcon key={i} style={{ color: '#4CAF50' }} />
      );
    } else if (i - 0.5 === value) {
      starIcons.push(
        <StarHalfIcon key={i} style={{ color: '#4CAF50' }} />
      );
    } else {
      // You can use an empty star icon or other representation here
      starIcons.push(<span key={i}>☆</span>);
    }
  }
  
  return (
    <div>
      {starIcons}
    </div>
  );
}
