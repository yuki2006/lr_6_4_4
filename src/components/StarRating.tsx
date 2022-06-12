import React from "react";
import { Star } from "./Star";

type Props = {
  onRate: (i:number) => void;
  totalStars?: number;
  selectedStars?: number;
  className?: string
}

export function StarRating ({
  onRate,
  totalStars = 5,
  selectedStars = 0,
  className=""
} : Props) {
  return (
    <div className={className}>
      <div>
        {[...Array(totalStars)].map((n, i) => (
          <Star
            key={i}
            isSelected={selectedStars > i}
            onSelect={() => onRate(i + 1)}
          />
        ))}
      </div>
      <p>
        {selectedStars} of {totalStars} stars
      </p>
    </div>
  );
}
