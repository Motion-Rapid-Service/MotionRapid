import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";
import { SetupConfigContext } from "../SetupEditor/SetupConfigContext";
import { SetupUndoContext } from "./../SetupEditor/SetupUndoContext";

//SetupToolbarContext

const CompositeChoiceListIndexComponent = (props: any) => {
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const SetupToolbarContextValue = useContext(SetupToolbarContext);
  const SetupConfigContextValue = useContext(SetupConfigContext);
  const Composite_ID = props.DownstreamMiddleDataComposite["Composite_ID"];
  const Composite_Name = props.DownstreamMiddleDataComposite["Composite_Name"];

  const MouseDown = () => {
    SetupEditorContextValue.choiceCompositeSetState(Composite_ID);
  };

  const MouseDoubleClick = () => {
    SetupConfigContextValue.setConfigModeArgsOption({ compositeID: props.DownstreamMiddleDataComposite["Composite_ID"] });
    SetupConfigContextValue.configModeSetState(SetupConfigContextValue.configModeList[8]);
    SetupConfigContextValue.configSwitchGUISetState(SetupConfigContextValue.configSwitchGUIList[1]);
  };

  return (
    <div className="composite_choice-listindex-area" onMouseDown={MouseDown} onDoubleClick={MouseDoubleClick}>
      <p>
        {Composite_Name} / {Composite_ID}
      </p>
    </div>
  );
};

const CompositeChoiceListComponent = () => {
  const AppContextValue = useContext(AppContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const SetupToolbarContextValue = useContext(SetupToolbarContext);

  console.log("previewUpdate CompositeChoiceListComponent");

  return (
    <div className="composite_choice-list-area">
      <>
        {AppContextValue.componentConvertCompositeChoiceArea().map((output: any, index: number) => (
          // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
          <CompositeChoiceListIndexComponent DownstreamMiddleDataComposite={output} key={index} />
        ))}
      </>
    </div>
  );
};

// const CompositeChoiceHeaderComponent = () => {
//     return (
//         <div className="composite_choice-header-area">
//         </div>
//     )
// }

const CompositeChoiceComponent = () => {
  // ここでhooksを使える
  return (
    <div className="composite_choice-area">
      <CompositeChoiceListComponent />
    </div>
  );
};
export default CompositeChoiceComponent;
