const express = require('express');

let app = express();

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static('./client/dist'))
app.use(express.json());
const ApiMethod = require('../helpers/github.js');
const {save, get25} = require('../database');

//search btn press sends {userName: name}
app.post('/repos', function (req, res) {
  //call the github function with the username supplied from input
  ApiMethod.getReposByUsername(req.body.userName)
  //with the results from github function
  .then(response => {
    return arrayOfRepos = response.data.map(obj => {
      return {
        'userName': obj.owner.login,
        'repoName': obj.name,
        'url': obj.html_url,
        'stars': obj.stargazers_count,
        'id': obj.id
      }
    });
  })
  .then(resultArray => {
    //call the save function on the repos array
    return save(resultArray)
  })
  //then respond with a success message
  .then(() => {
    res.status(201).send('repos saved')
  })//respond with an error if save went wrong
  .catch((error) => {
    if (error.code === 11000) {
      res.status(409).send('duplicate input')
    } else {
      res.status(500).send('github couldnt find user')
    }
  })
  //catch error of github request where to put it
  //.catch(error => {
  //  res.status(500).send('github server error')
  //})
});

app.get('/repos', function (req, res) {
  get25()
    .then((data) => {
      console.log('then get25')
      res.status(200).send(data)
    })
    .catch(() => {
      console.log('get catch')
      res.status(500).send('couldnt get duplicate')
    })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

