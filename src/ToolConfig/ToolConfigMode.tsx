import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState, useRef } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import * as SetupEditor from "./../SetupEditor/SetupEditor";

import * as ToolConfigContext from "./ToolConfigContext";
import * as ToolConfigParts from "./ToolConfigParts";

import * as middleDataClass from "./../MiddleData/middleDataClass";
import * as middleDataOperation from "./../MiddleData/middleDataOperation";
import * as AnimatorGroupFormat from "./../AnimatorGroupFormat/AnimatorGroupFormat";
import * as AnimatorGroupPropertyFormat from "./../AnimatorGroupFormat/AnimatorGroupPropertyFormat";
import * as MiddleDataOperationType from "./../MiddleData/middleDataOperationType";
import { AppContext } from "../AppContext";
import { SetupConfigContext } from "./../SetupEditor/SetupConfigContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";

import * as UserHand from "./../UserHand";
