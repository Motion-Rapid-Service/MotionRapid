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

const ConfigButton = (props: any) => {

    const SetupConfigContextValue = useContext(SetupConfigContext);

    const mouseDown = () => { //マウスがクリックされたとき
        SetupConfigContextValue.configModeSetState(SetupConfigContextValue.configModeList[0])
        props.buttonFunc()
    }

    return (
        <div className="tool_config-area-button" onMouseDown={mouseDown}>
            <p>{props.text}</p>
        </div>
    )
}

const ConfigButtonBottm = (props: any) => {
    return (
        <div className="tool_config-area-bottom-area">
            <ConfigButton text={"決定"} />
            <ConfigButton text={"キャンセル"} />
        </div>
    )
}

const SwitchConfigMode = (props: any) => {
    const configMode: string = props.configMode
    const configModeList: Array<string> = props.configModeList
    if (configMode === configModeList[1]) {
        return (
            <>
                <ConfigModeComposite />
                <ConfigButtonBottm/>
            </>
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
                <div className="tool_config-area-view">
                    <div className="tool_config-area-title"><div className="text"><p>config mode {configMode}</p></div></div>
                    <SwitchConfigMode configMode={configMode} configModeList={configModeList} />
                </div>
            </div>
        </div>

    )

}

const ToolConfigComponent = () => {
    return (<SwitchConfigBackGrounde />)
}

export default ToolConfigComponent