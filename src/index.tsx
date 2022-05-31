import * as React from 'react';
const { useContext, useReducer, createContext } = React;
import { createRoot } from 'react-dom/client';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App';


// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// );

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);