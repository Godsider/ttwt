import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
// import { render } from "react-dom";
import { Provider } from "react-redux";

// import store from "./redux/store/index";
import rootReducer from "./redux/reducers/index";
import Labirynth from "./components/Labirynth";


const store = createStore( rootReducer );


ReactDOM.render(
  <Provider store = { store }>
    <Labirynth />
  </Provider>,
  document.getElementById( "root" )
);

