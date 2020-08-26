"use strict";
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  /* Reading the context.clientContext will give us the current user */
  /*
  const claims = context.clientContext && context.clientContext.user;
  console.log("User claims", claims);
  if (!claims) {
    console.log("No claims! Begone!");
    return {
      statusCode: 401,
      body: JSON.stringify({
        data: "NOT ALLOWED",
      }),
    };
  }*/
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  return fetch(process.env.SZ_DM_URL, {
    headers: {
      "content-type": "application/json",
      Authorization: "apikey " + process.env.SZ_API_KEY,
    },
    method: "POST",
    body: event.body,
  })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify(data),
    }))
    .catch((error) => ({
      statusCode: error.statusCode,
      body: `Oops! Something went wrong. ${error}`,
    }));
};
