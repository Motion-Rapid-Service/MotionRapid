import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";

const CompositeChoiceListIndexComponent = (props:any) => {
  return (
    <div className="composite_choice-listindex-area">
      <p>{props.DownstreamMiddleDataComposite["Composite_ID"]}</p>
    </div>
  );
};

const CompositeChoiceListComponent = () => {
  const AppContextValue = useContext(AppContext);

  return (
    <div className="composite_choice-list-area">
          <>
            {AppContextValue.componentConvertCompositeChoiceArea().map((output:any, index:number) => (
              // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
              <CompositeChoiceListIndexComponent DownstreamMiddleDataComposite={output} key={index}/>
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
