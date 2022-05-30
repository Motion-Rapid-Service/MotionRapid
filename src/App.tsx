import * as React from 'react';
const { useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TimelineComponent from "./timeline/timeline";

const App = () => {
    // ここでhooksを使える
    return (<div>
        <TimelineComponent/>
    </div>)
  }
export default App;
