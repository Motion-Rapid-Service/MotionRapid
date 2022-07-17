import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";


import TimelineComponent from "./../timeline/timeline";
import ToolBarComponent from "./../ToolBar/ToolBar";
import ToolConfigComponent from "./../ToolConfig/ToolConfig";
import CompositeEditorComponent from "./../CompositeChoice/CompositeChoice";

import { SetupConfigContext } from "./SetupConfigContext"
//ここを画面結合専用層にする予定
//ここから ツールバー処理用のクラス


const SetupCompletion = () => {
    const SetupConfigContextValue = useContext(SetupConfigContext)
    const configMode = SetupConfigContextValue.configMode
    const configModeList = SetupConfigContextValue.configModeList

    const [configStyle, configStyleSetState] = useState<React.CSSProperties>({});




    useEffect(() => {

        if (configMode === configModeList[0]) {

        }
        else {
            const styleTemp:React.CSSProperties = {
                position: "fixed",
            }
            configStyleSetState(styleTemp)
        }
    
    }, [configMode])
    


    return (
        <div style={configStyle}>
            <ToolBarComponent />
            <CompositeEditorComponent />
            <TimelineComponent />
            <ToolConfigComponent />
        </div>
    );
};
export default SetupCompletion;
