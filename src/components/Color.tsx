import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { ColorDataTyp } from "./ColorProvider";
import { useColors } from "../hooks/useColors";
import { StarRating } from "./StarRating";

export function Color(props: ColorDataTyp) {
  const { id, title, color, rating } = props
  const { rateColor, removeColor } = useColors();
  const [count, setCount] = useState(0);

  return (
    <section>
      <h1>{title} -- click count {count} </h1>
      <button onClick={() => removeColor(id)}>
        <FaTrash />
      </button>
      <div style={{ height: 50, backgroundColor: color }} />
      <StarRating
        selectedStars={rating}
        onRate={rating => {
          rateColor(id, rating);
          setCount(count+1);
        }}
      />
    </section>
  );
}
