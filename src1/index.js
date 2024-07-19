import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import "./assets/base.scss";
import Main from "./components/Main";
import store from "../src/redux/store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");

const renderApp = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
    rootElement
  );
};

renderApp(Main);

if (module.hot) {
  module.hot.accept("./components/Main", () => {
    const NextApp = require("./components/Main").default;
    renderApp(NextApp);
  });
}
