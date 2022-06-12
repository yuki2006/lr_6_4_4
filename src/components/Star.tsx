import React from "react";
import { FaStar } from "react-icons/fa";

// nf: write "selected" as "selected:boolean" let typecheker output red wavy line
export const Star = ({ isSelected = false, onSelect = (f:unknown) => f }) => {
  return <FaStar color={isSelected ? "red" : "grey"} onClick={onSelect} />;
}
