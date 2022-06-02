import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { MediaObjectContext } from "./timelineContext";

import ParameterAreaComponent from "./parameterAreaComponent";
import * as InMediaObjectArea from "./InMediaObjectArea";

const MediaObjectAreaComponent = () => {
  const mediaObjectAreaElement = useRef(null);

  const [parameterOpen,parameterOpenSetState] = useState<boolean>(true);

  return (
    <>
      <div
        className="media_object-area"
        ref={mediaObjectAreaElement}
        //   onMouseMove={timeLineMouseMoveAction}
        
        //   onMouseUp={MouseRelease}
      >
        <MediaObjectContext.Provider
          value={{ mediaObjectAreaElement:mediaObjectAreaElement,parameterOpen:parameterOpen,parameterOpenSetState:parameterOpenSetState }}
        >
          <InMediaObjectArea.MediaObjectScrollComponent />
          <ParameterAreaComponent/>
        </MediaObjectContext.Provider>
        
      </div>
      
    </>
  );
};

export default MediaObjectAreaComponent;
