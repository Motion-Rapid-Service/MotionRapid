import * as React from 'react';
const { useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    // ここでhooksを使える
    return (<div>
        <p>快速急行大阪上本町行きです</p>
    </div>)
  }
export default App;
