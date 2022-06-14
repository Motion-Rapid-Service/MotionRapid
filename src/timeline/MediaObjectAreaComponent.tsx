import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { MediaObjectContext } from "./timelineContext";

import * as InMediaObjectArea from "./InMediaObjectArea";

const MediaObjectAreaComponent = () => {
  const mediaObjectAreaElement = useRef(null);

  const [parameterOpen, parameterOpenSetState] = useState<boolean>(true);

  return (
    <>
      <div className="media_object-area" ref={mediaObjectAreaElement}>
        <MediaObjectContext.Provider
          value={{
            mediaObjectAreaElement: mediaObjectAreaElement,
            parameterOpen: parameterOpen,
            parameterOpenSetState: parameterOpenSetState,
          }}
        >
          {/* <div className="media_object-area-left"></div> */}
          {/* <div className="media_object-area-right"></div>*/}
          <InMediaObjectArea.timelineAreaLeft />
          <InMediaObjectArea.timelineAreaRight />
        </MediaObjectContext.Provider>
      </div>
    </>
  );
};

export default MediaObjectAreaComponent;
