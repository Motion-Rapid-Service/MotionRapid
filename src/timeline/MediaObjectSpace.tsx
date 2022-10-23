import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;

import { AppContext } from "../AppContext";
import { MediaObjectContext, TimelineAreaDivContext, LayerPanelContext, LayerDurationContext } from "./timelineContext";

const MediaObjectAreaSpaceComponent = (props: any) => {
  const classNamSpace = "media_object-area-space";

  if (props.emphasis) {
    return <div className={classNamSpace} style={{ backgroundColor: "rgb(200,200,255)" }}></div>;
  }

  return <div className={classNamSpace}></div>;
};

export const SwitchMediaObjectAreaSpace = (props: any) => {
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const [emphasisSpace, emphasisSpaceSetState] = useState<boolean>(false);

  useEffect(() => {
    //レイヤーパネルのメディアオブジェクトの順番を帰るときに移動先を示すDOMの操作
    const match: boolean = Number(props.spaceIndex) === Number(TimelineAreaDivContextValue.focusMediaObjectSpace);

    if (match) {
      emphasisSpaceSetState(true);
    } else {
      emphasisSpaceSetState(false);
    }
  }, [TimelineAreaDivContextValue.focusMediaObjectSpace, MediaObjectContextValue.mediaObjectUUID, MediaObjectContextValue.mediaObjectRender]);

  return <MediaObjectAreaSpaceComponent emphasis={emphasisSpace} />;
};
