import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
//import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";

//SetupToolbarContext

const CompositeChoiceListIndexComponent = (props: any) => {
  const SetupEditorContextValue = useContext(SetupEditorContext);
  //const SetupToolbarContextValue = useContext(SetupToolbarContext);
  const Composite_ID = props.DownstreamMiddleDataComposite["Composite_ID"];

  const MouseDown = () => {
    SetupEditorContextValue.choiceCompositeSetState(Composite_ID);
  };

  return (
    <div className="composite_choice-listindex-area" onMouseDown={MouseDown}>
      <p>{Composite_ID}</p>
    </div>
  );
};

const CompositeChoiceListComponent = () => {
  const AppContextValue = useContext(AppContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  //const SetupToolbarContextValue = useContext(SetupToolbarContext);

  return (
    <div className="composite_choice-list-area">
      <>
        {AppContextValue.componentConvertCompositeChoiceArea().map(
          (output: any, index: number) => (
            // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
            <CompositeChoiceListIndexComponent
              DownstreamMiddleDataComposite={output}
              key={index}
            />
          )
        )}
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
