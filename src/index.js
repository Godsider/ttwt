import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

// Custom imports
import { persistor, store } from "./redux/store/index";
import Labirynth from "./components/Labirynth";


ReactDOM.render(
  <Provider store = { store }>
    <PersistGate loading = { null } persistor = { persistor }>
      <Labirynth />
    </PersistGate>
  </Provider>,
  document.getElementById( "root" )
);

