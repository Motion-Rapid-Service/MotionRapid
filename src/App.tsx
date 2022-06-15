import * as React from "react";
const { useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TimelineComponent from "./timeline/timeline";

import { jsonFormatContext } from "./MiddleData/middleFormatContext";

import UUID from "uuidjs";

import * as jsonOperation from "./MiddleData/middleDataOperation"

const App = () => {
  // ここでhooksを使える
  return (
    <div>
      {/* <jsonFormatContext.Provider
        value={{
          jsonFormat_Composite: jsonFormat_Composite,
          jsonFormat_Keyframe: jsonFormat_Keyframe,
          jsonFormat_MediaObject: jsonFormat_MediaObject,
          jsonFormat_Property: jsonFormat_Property,
        }}
      > */}
        <TimelineComponent />
      {/* </jsonFormatContext.Provider> */}
    </div>
  );
};
export default App;
