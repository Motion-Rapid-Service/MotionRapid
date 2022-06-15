import * as React from "react";
const { createContext } = React;

type jsonFormatContextValue = {
  //   sta: Number;
  //   end: Number;

  // areaFocus:boolean;
};

export const jsonFormatContext = createContext<jsonFormatContextValue>(
  {} as jsonFormatContextValue
);
