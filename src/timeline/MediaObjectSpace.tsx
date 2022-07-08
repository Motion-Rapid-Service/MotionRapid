import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;



const MediaObjectAreaSpaceComponent = (props:any) => {
    return (
      <div className="media_object-area-space"></div>
    )
  }
  
export const componentGenerateMediaObjectAreaSpace = (spaceIndex:number) => {
    console.log("MediaObjectAreaSpaceComponentIndex",spaceIndex)
    return <MediaObjectAreaSpaceComponent/>;
  };
  