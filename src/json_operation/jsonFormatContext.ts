import * as React from "react";
const { createContext } = React;

type jsonFormatContextValue = {
  //   sta: Number;
  //   end: Number;
  jsonFormat_Composite: any;
  jsonFormat_Keyframe: boolean;
  jsonFormat_MediaObject: any;
  jsonFormat_Property: any;
  // areaFocus:boolean;
};

export const jsonFormatContext = createContext<jsonFormatContextValue>(
  {} as jsonFormatContextValue
);
