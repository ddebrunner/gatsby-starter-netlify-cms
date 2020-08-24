'use strict'
const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  //console.log('BODY')
  //console.log(event.body)
  //console.log('---')

  return fetch(process.env.SZ_DM_URL, {
    headers: {
      'content-type': 'application/json',
      Authorization: 'apikey ' + process.env.SZ_API_KEY,
    },
    method: 'POST',
    body: JSON.stringify(event.body),
  })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify(data),
    }))
    .catch((error) => ({
      statusCode: error.statusCode,
      body: `Oops! Something went wrong. ${error}`,
    }))
}
