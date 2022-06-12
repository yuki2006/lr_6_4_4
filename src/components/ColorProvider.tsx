import React, { createContext, useState, FC } from "react";
import uuidv4 from "uuidv4";
import { getInitialColorDataList } from "./ColorDataList";

export type ColorDataTyp = {
  id: string;
  title: string;
  color: string;
  rating: number;
};
const initialColorDataList = getInitialColorDataList()

/*
type VoidFn1Typ = (a:any)=>void
function VoidFn1 (a:undefined) {}
type VoidFn2Typ = (a:any,b:any)=>void
function VoidFn2 (a:undefined,b:undefined) {}
export type ColorContextTyp = { 
  colors: ColorDataTyp[]; 
  addColor: VoidFn2Typ, rateColor: VoidFn2Typ, removeColor: VoidFn1Typ; 
}
export const ColorContext : React.Context<ColorContextTyp> = createContext({
  colors: initialColorDataList, 
  // the following property values are silly workarounds to suppress typecheker warnings
  addColor: VoidFn2, rateColor: VoidFn2, removeColor: VoidFn1
})
*/

export type ColorContextTyp = { 
  colors: ColorDataTyp[]; 
  addColor: (a:string,b:string)=>void, 
  rateColor: (a:string,b:number)=>void
  removeColor: (a:string)=>void
}
export let ColorContext : React.Context<ColorContextTyp>;
/*
createContext({
  colors: initialColorDataList, 
  // the following property values are silly workarounds to suppress typecheker warnings
  addColor: VoidFn2, rateColor: VoidFn2, removeColor: VoidFn1
})
*/

type Props = {
  children: React.ReactNode;
};

export const ColorProvider : FC<Props> = (props: Props) => {
  const [colors, setColors] = useState<ColorDataTyp[]>(initialColorDataList);

  const addColor = (title: string, color: string): void => {
    setColors([...colors, { id: uuidv4(), rating: 0, title, color }]);
  };

  const rateColor = (id: string, rating: number): void => {
    setColors(
      colors.map((color: ColorDataTyp) =>
        color.id === id ? { ...color, rating } : color
      )
    );
  };

  const removeColor = (id: string): void => {
    setColors(colors.filter((color: ColorDataTyp) => color.id !== id));
  };

  ColorContext = createContext({ colors, addColor, rateColor, removeColor })

  return (
    <ColorContext.Provider value={{ colors, addColor, rateColor, removeColor }}>
      {props.children}
    </ColorContext.Provider>
  );
}
