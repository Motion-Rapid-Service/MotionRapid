import * as React from "react";
const { useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./timeline/CSS/timeline.css";
import "./timeline/CSS/parameter.css";
import "./timeline/CSS/keyframe.css";

import "./toolBar/CSS/ToolBar.css";
import Editor from "./Editor";

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
        <Editor />
      {/* </jsonFormatContext.Provider> */}
    </div>
  );
};
export default App;
