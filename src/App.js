import React, { Fragment } from "react";
import { Provider } from "react-redux";

import GlobalStyles from "./styles/global";

import Main from "./pages/Main";
import store from "./store";

const App = () => (
  <Fragment>
    <Provider store={store}>
      <GlobalStyles />
      <Main />
    </Provider>
  </Fragment>
);

export default App;
