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
  .then(response => {
    return response.data.map(obj => ({
      'userName': obj.owner.login,
      'repoName': obj.name,
      'url': obj.html_url,
      'stars': obj.stargazers_count,
      'id': obj.id
    }));
  })
  .catch(err => {
    console.log('error at github repo get')
  })
}

module.exports.getReposByUsername = getReposByUsername;