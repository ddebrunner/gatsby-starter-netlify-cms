console.log("DDD:START:voyager.js");

function introspectionProvider(introspectionQuery) {
  // This example expects a GraphQL server at the path /graphql.
  // Change this to point wherever you host your GraphQL server.
  var urlParams = new URLSearchParams(window.location.search);
  return fetch("/.netlify/functions/gql", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: introspectionQuery }),
    // credentials: 'include',
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (responseBody) {
      try {
        return JSON.parse(responseBody);
      } catch (error) {
        return responseBody;
      }
    });
}

// Render <Voyager /> into the body.
GraphQLVoyager.init(document.getElementById("voyager"), {
  introspection: introspectionProvider,
});
