import { useState } from "react";

const Star = ({ filled, onMouseEnter, onMouseLeave, onClick }) => {
  return (
    <svg
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`w-5 h-5 cursor-pointer ${
        filled ? "fill-yellow-400" : "fill-gray-300"
      }`}
    >
      <path d="M12 2l2.9 6 6.6.6-5 4.3 1.5 6.5L12 16.9 6 19.4l1.5-6.5-5-4.3 6.6-.6L12 2z" />
    </svg>
  );
};

const StarRating = ({ value = 0, onChange }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={hover ? star <= hover : star <= value}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          onClick={() => onChange?.(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;