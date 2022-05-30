import * as React from 'react';
const { useContext, useReducer, createContext } = React;
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App';


ReactDOM.render(
    
    <App />,
    
    document.getElementById('root')
);