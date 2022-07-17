import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";


import { AppContext } from "../AppContext";
import { SetupConfigContext } from "./../SetupEditor/SetupConfigContext";

const ConfigModeComposite = () => {
    return (<div className="tool_config-area-mode-composite"></div>)
}

// const ConfigBackGround = () => {
//     return ()
// }

const SwitchConfigMode = (props: any) => {
    const configMode: string = props.configMode
    const configModeList: Array<string> = props.configModeList
    if (configMode === configModeList[1]) {
        return (
            <div className="tool_config-area-view">
                <ConfigModeComposite />
            </div>

        )
    }
}

const SwitchConfigBackGrounde = () => {
    const SetupConfigContextValue = useContext(SetupConfigContext)
    const configMode = SetupConfigContextValue.configMode
    const configModeList = SetupConfigContextValue.configModeList

    console.log(configMode, configModeList)

    if (configMode === configModeList[0]) {
        return (<></>)
    }


    return (
        <div className="tool_config-area">
            <div className="tool_config-area-background">
                <SwitchConfigMode configMode={configMode} configModeList={configModeList} />
            </div>
        </div>

    )

}

const ToolConfigComponent = () => {
    return (<SwitchConfigBackGrounde />)
}

export default ToolConfigComponent