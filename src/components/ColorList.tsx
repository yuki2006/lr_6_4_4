import React from "react";
// import { css } from "@emotion/react";
import { useColors } from "../hooks/useColors";
import { Color } from "./Color";

export function ColorList() {
  const { colors } = useColors();

  if (!colors.length) {
    return <div>No Colors Listed. (Add a Color)</div>;
  }

  return (
    <div>
      {colors.map(color => (
        <Color key={color.id} {...color} />
      ))}
    </div>
  );
}

/*
    <div
      className={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      {colors.map(color => (
        <Color key={color.id} {...color} />
      ))}
    </div>
*/
