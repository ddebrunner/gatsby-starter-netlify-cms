import * as React from "react";
import { render } from "react-dom";

import GraphqlBirdseye from "graphql-birdseye";
import { smallSchema /** bigSchema */ as dummySchema } from "./dummySchema";

class App extends React.Component<any> {
  render() {
    return (
      <div>
        <GraphqlBirdseye
          introspectionQuery={dummySchema.data}
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

export default () => (
  <React.Fragment>
    <div id="gqlv" />
    <App />
  </React.Fragment>
);

// </React.Fragment>render(, document.getElementById("gqlv"));
