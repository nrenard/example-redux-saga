import React, { Fragment } from "react";
import { Provider } from "react-redux";

import GlobalStyles from "./styles/global";

import Main from "./pages/Main";

import store from "./store";

const App = () => (
  <Provider store={store}>
    <Fragment>
      <GlobalStyles />
      <Main />
    </Fragment>
  </Provider>
);

export default App;
