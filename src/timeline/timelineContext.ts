import * as React from "react";
const { createContext } = React;

type MediaObjectContextValue = {
  sta: Number;
  end: Number;
};

export const MediaObjectContext = createContext<MediaObjectContextValue>(
  {} as MediaObjectContextValue
);
