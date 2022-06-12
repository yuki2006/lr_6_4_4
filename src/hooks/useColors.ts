import { useContext } from "react";
import { ColorContext, ColorContextTyp } from "../components/ColorProvider";

export function useColors(): ColorContextTyp {
  return useContext(ColorContext);
}
