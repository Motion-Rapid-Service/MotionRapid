import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SetupToolbar from "./SetupToolbar";
import { AppContext } from "../AppContext";
import { SetupConfigContext } from "./SetupConfigContext";

//ここを画面結合専用層にする予定
//ここから ツールバー処理用のクラス


const SetupConfig = () => {
    const configModeList = ["not", "composite"]
    const [configMode, configModeSetState] = useState<string>(configModeList[1]);

    useEffect(() => {
    }, [configMode]);

    return (
        <SetupConfigContext.Provider value={{
            configMode: configMode,
            configModeSetState: configModeSetState,
            configModeList: configModeList
        }}>

            <SetupToolbar />
        </SetupConfigContext.Provider>
        
    );
};
export default SetupConfig;
