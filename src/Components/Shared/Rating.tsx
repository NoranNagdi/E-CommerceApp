import React from "react";
import { Star } from "lucide-react";

export default function Rating({ rating }: { rating: number }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const totalStars = 5;

  for (let i = 0; i < totalStars; i++) {
    if (i < fullStars) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <Star
          key={i}
          className="w-5 h-5 text-yellow-400"
          style={{
            fill: "url(#halfGradient)",
          }}
        />
      );
    } else {
      stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
    }
  }

  return (
    <div className="flex items-center mb-4">
      <svg width="0" height="0">
        <defs>
          <linearGradient id="halfGradient" x1="0" x2="100%" y1="0" y2="0">
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
      {stars}
      <span className="text-gray-600 text-sm font-medium">({rating})</span>
    </div>
  );
}
