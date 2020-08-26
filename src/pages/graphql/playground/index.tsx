import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//import { Playground, store } from "graphql-playground-react";

class PlaygroundApp extends React.Component<any> {
  render() {
    return (
      <div
        id="container"
        style={{ width: 800, height: 600, border: "1px solid #ccc" }}
      ></div>
    );
  }

  componentDidMount() {
    import("graphql-playground-react").then((gpr) => {
      // HERE!!
      ReactDOM.render(
        <Provider store={gpr.store}>
          <gpr.Playground endpoint="/.netlify/functions/gql" />
        </Provider>,
        document.body
      );
    });
  }
}

export default () => <PlaygroundApp />;
