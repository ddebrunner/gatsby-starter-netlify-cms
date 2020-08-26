import * as React from "react";
import { render } from "react-dom";

const IntrospectionQuery = `
query IntrospectionQuery {
  __schema {
    queryType { name }
    mutationType { name }
    subscriptionType { name }
    types {
      ...FullType
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
      }
    }
  }
}
fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}
fragment InputValue on __InputValue {
  name
  description
  type { ...TypeRef }
  defaultValue
}
fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}
`;

import GraphqlBirdseye from "graphql-birdseye";
// import { smallSchema /** bigSchema */ as dummySchema } from "./dummySchema";

import fetch from "isomorphic-fetch";

function introspectionProvider(query) {
  return fetch("/.netlify/functions/gql", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query }),
  }).then((response) => response.json());
}

class App extends React.Component<any> {
  constructor(props) {
    super(props);
    this.state = {
      gqlschema: "",
    };
  }
  componentDidMount() {
    var q = IntrospectionQuery.replace(/(\r\n|\n|\r)/gm, " ");
    console.log(q);
    const fetchSchema = async () => {
      const response = await introspectionProvider(q);
      this.setState({ gqlschema: response.data });
    };
    fetchSchema();
  }

  render() {
    return (
      <div id="gqlv">
        {this.state.gqlschema && (
          <GraphqlBirdseye
            introspectionQuery={this.state.gqlschema}
            style={{ height: "100vh" }}
          />
        )}
      </div>
    );
  }
}

export default () => <App />;
