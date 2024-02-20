const express = require('express');

let app = express();

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static('./client/dist'))
app.use(express.json());
const ApiMethod = require('../helpers/github.js');
const db = require('../database/index.js');
//search btn press sends {userName: name}
app.post('/repos', function (req, res) {
  //call the github function with the username supplied from input
  ApiMethod.getReposByUsername(req.body.userName)
  //with the results from github function
  .then(arrayOfRepos => {
    //call the save function on the repos array
    db.save(arrayOfRepos)
    res.status(200).send('repos saved')
    })
  .catch(error => {
    res.status(500).send('server error')
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.get25((error, results) => {
    if (error) {
      res.status(500).send('couldnt get top25')
    } else {
      res.status(200).json(results);
      console.log(results, 'app.get')
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

