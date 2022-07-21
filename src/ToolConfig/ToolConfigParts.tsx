import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupConfigContext } from "./../SetupEditor/SetupConfigContext";
import * as ToolConfigContext from "./ToolConfigContext";

const ConfigSelectOption = (props: any) => {
  return <option value={props.index}>{props.output}</option>;
};

export const ConfigSelect = () => {
  const SwitchConfigSettingItemsCompositeContextValue = useContext(ToolConfigContext.SwitchConfigSettingItemsCompositeContext);

  const onChange = () => {
    console.log("ConfigSelect","onChange")
  }

  return (
    <select>
      {SwitchConfigSettingItemsCompositeContextValue.exposeValue.map((output, index) => (
        <ConfigSelectOption output={output} index={index} onChange={onChange}/>
      ))}
    </select>
  );
};

export const ConfigTextBox = () => {
  const SwitchConfigSettingItemsCompositeContextValue = useContext(ToolConfigContext.SwitchConfigSettingItemsCompositeContext);
  const onChange = (event: any) => {
    const text = event.target.value;
    SwitchConfigSettingItemsCompositeContextValue.configInputSetState(String(text));
    console.log("ConfigTextBox", text);
  };
  return (
    <div className="config_parts-textbox">
      <input type="text" value={SwitchConfigSettingItemsCompositeContextValue.configInput} onChange={onChange} />
    </div>
  );
};

export const ConfigButton = (props: any) => {
  const SetupConfigContextValue = useContext(SetupConfigContext);

  const mouseDown = () => {
    //マウスがクリックされたとき
    SetupConfigContextValue.configModeSetState(SetupConfigContextValue.configModeList[0]);
    props.buttonFunc();
  };

  return (
    <div className="tool_config-area-button" onMouseDown={mouseDown}>
      <p>{props.text}</p>
    </div>
  );
};
