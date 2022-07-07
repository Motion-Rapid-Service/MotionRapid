import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetupEditor from "./SetupEditor";
import { AppContext } from "../AppContext";
// import { SetupToolbarContext } from "./SetupToolbarContext";

//ここまでツールバー処理用のクラス

// const SetupToolbar = () => {
//   // ここでhooksを使える

//   // useEffect(() => {
//   //   console.log(
//   //     "choiceComposite useEffect",
//   //     choiceComposite
//   //   );
//   // }, [choiceComposite]);

//   // useEffect(() => {
//   //   console.log(
//   //     "toolBarClassificationArray useEffect",
//   //     toolBarClassificationArray
//   //   );
//   // }, [toolBarClassificationArray]);

//   const Test = () => {
//     console.log("（╹◡╹）");
//   };

//   return (
//     <div>
//       <SetupToolbarContext.Provider
//         value={{

//         }}
//       >

//         <ToolBarComponent />

//     </div>
//   );
// };
// export default SetupToolbar;
