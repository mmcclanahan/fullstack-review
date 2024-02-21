const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (userName) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${userName}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };//return the promise write out the then and catch
  return axios.get(options.url, options)

}

module.exports.getReposByUsername = getReposByUsername;