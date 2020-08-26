import * as React from "react";

import { Provider } from "react-redux";
import { Playground, store } from "graphql-playground-react";

class PlaygroundApp extends React.Component<any> {
  render() {
    return (
      <Provider store={store}>
        <Playground endpoint="/.netlify/functions/gql" />
      </Provider>
    );
  }
}

export default () => <PlaygroundApp />;
