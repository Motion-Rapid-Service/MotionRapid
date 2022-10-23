import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;

import { AppContext } from "../../AppContext";
import { SetupEditorContext } from "../../SetupEditor/SetupEditorContext";
import { TimeNavigatorContext, TimeNavigatorLayerDurationContext, TimeNavigatorTimelineLayerDurationContext } from "./TimeNavigatorContext";

class DownstreamTimeAxisBlockClass {
  timeAxisPos: number;
  stylePos: number;
  constructor(send_timeAxisPos: number, send_stylePos: number) {
    this.timeAxisPos = send_timeAxisPos;
    this.stylePos = send_stylePos;
  }
}

const TimeAxisBlockComponent = (props: any) => {
  const DownstreamTimeAxisBlock: DownstreamTimeAxisBlockClass = props.DownstreamTimeAxisBlock;
  return (
    <div
      className="timeNavigator-timeaxis-block"
      style={{
        left: DownstreamTimeAxisBlock.stylePos,
      }}
    >
      <p>{DownstreamTimeAxisBlock.timeAxisPos}</p>
    </div>
  );
};
const componentConvertTimeAxisBlock = () => {
  let tempArray: Array<DownstreamTimeAxisBlockClass> = [];
  const AppContextValue = useContext(AppContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const TimeNavigatorContextValue = useContext(TimeNavigatorContext);
  const compositeDuration: number = AppContextValue.getCompositeDuration(SetupEditorContextValue.choiceComposite);
  if (!compositeDuration) {
    return [];
  }

  const sectionViewStyle = TimeNavigatorContextValue.timelimeRender.endViewTime - TimeNavigatorContextValue.timelimeRender.staViewTime;

  let sectionTemp = sectionViewStyle;
  let digit = 0;

  while (sectionTemp > 1) {
    digit++;
    sectionTemp = sectionTemp / 5;
  }

  const sectionBlockView = 10 ** (digit - 3);
  const quantity = Math.floor(compositeDuration / sectionBlockView) + 1;

  if (sectionBlockView >= 1) {
    for (let i = 0; i < quantity; i++) {
      const thenTimeAxisPos = i * sectionBlockView;

      if (TimeNavigatorContextValue.timelimeRender.staViewTime <= thenTimeAxisPos && thenTimeAxisPos <= TimeNavigatorContextValue.timelimeRender.endViewTime) {
        const stylePos = AppContextValue.conversionTimeToStyle(
          thenTimeAxisPos,
          TimeNavigatorContextValue.timelimeRender.staViewTime,
          TimeNavigatorContextValue.timelimeRender.endViewTime,
          TimeNavigatorContextValue.timelimeRender.durationWidth
        );

        tempArray.push(new DownstreamTimeAxisBlockClass(thenTimeAxisPos, stylePos));
      }
    }
  }
  console.log("sectionBlockView", sectionBlockView, sectionViewStyle, digit, quantity, tempArray);

  return tempArray;
};

const TimeAxisComponent = () => {
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const TimeNavigatorContextValue = useContext(TimeNavigatorContext);

  // useEffect(() => {}, [SetupEditorContextValue.choiceComposite, TimeNavigatorContextValue.staStyleViewPos, TimeNavigatorContextValue.endStyleViewPos]);

  return (
    <div className="timeNavigator-timeaxis">
      {componentConvertTimeAxisBlock().map((output: any, index: number) => (
        // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)

        <TimeAxisBlockComponent DownstreamTimeAxisBlock={output} key={index} />
      ))}
    </div>
  );
};
export default TimeAxisComponent;
