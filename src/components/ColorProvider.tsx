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

export type ColorContextTyp = { 
  colors: ColorDataTyp[]; 
  addColor: (a:string,b:string)=>void, 
  rateColor: (a:string,b:number)=>void
  removeColor: (a:string)=>void
}


// 下記の「letに型宣言を付けて、初期化代入を行わない」記法によって、
// ColorContextの値はundefinedになるだろうが、type checkerには怒られないようだ。
//
// また、少し下にある「ColorContextへの代入」も、type checkerには怒られない。
// (letの宣言と、createContextによる代入やColor.Provierに対するvalue属性の
//  型が整合していないと怒られてしまう)
//
export let ColorContext : React.Context<ColorContextTyp>;


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


  // ColorContextへの代入:
  //
  // 本ファイルの上部で変数ColorContextをletで宣言しているが、それをせずに
  // この位置で、ColorContextをconstで宣言して createContextの返り値を初期化代入
  // することも考えられる。
  // ただその場合は、カスタムフックuseColorsの定義(ColorContextがglobal scopeに
  // 置かれていることを想定している)も、なんらかの方法で定義し直す必要がある。
  //
  // なお、createContextのarg1はReact v18からは必須引数になってしまっている
  // (テストの利便性のためらしい)が、上記let宣言の位置で "意味のある" 引数を与える
  // ことは難しい。というのは、本例の場合は addColor/rateColor/removeColor(や
  // それらが参照するsetColor)は、関数コンポーネントColorProviderの内部変数なので。
  //
  // 注:
  //   オリジナル本の時点ではcreateContextは引数を取らない。また、コードはJSで
  //   記述されており、全体として型整合しているコードは示されていない
  //
  ColorContext = createContext({ colors, addColor, rateColor, removeColor })


  // Context.Providerに対する以下のvalue属性は必須であり、createContextに与える
  // 引数と型が整合していないと type checker に怒られる。
  // ( {colors, ..., removeColor } を一旦変数に代入しておいて、その変数を
  //   createContextの引数 と value属性に対して与えても良いかもしれない )
  //
  return (
    <ColorContext.Provider value={{ colors, addColor, rateColor, removeColor }}>
      {props.children}
    </ColorContext.Provider>
  );
}
