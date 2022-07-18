import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupConfigContext } from "./../SetupEditor/SetupConfigContext";
import * as ToolConfigContext from "./ToolConfigContext";

export type configTextBoxProps = {
  configInput: string;
  configInputSetState: Function;
};

export const ConfigTextBox = (props: configTextBoxProps) => {
  const onChange = (event: any) => {
    const text = event.target.value;
    props.configInputSetState(String(text));
    console.log("ConfigTextBox", text);
  };
  return (
    <div className="config_parts-textbox">
      <input type="text" value={props.configInput} onChange={onChange} />
    </div>
  );
};

export const ConfigButton = (props: any) => {
  const SetupConfigContextValue = useContext(SetupConfigContext);

  const mouseDown = () => {
    //マウスがクリックされたとき
    SetupConfigContextValue.configModeSetState(
      SetupConfigContextValue.configModeList[0]
    );
    props.buttonFunc();
  };

  return (
    <div className="tool_config-area-button" onMouseDown={mouseDown}>
      <p>{props.text}</p>
    </div>
  );
};
