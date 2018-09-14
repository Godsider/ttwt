import React from "react";
import ReactDOM from "react-dom";
// import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import Labirynth from "./components/Labirynth";


ReactDOM.render(
  <Provider store = { store }>
    <Labirynth />
  </Provider>,
  document.getElementById( "root" )
);

