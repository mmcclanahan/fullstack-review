const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true, useUnifiedTopology: true });

let repoSchema = mongoose.Schema({
  userName: String,
  repoName: String,
  url: String,
  stars: Number,
  id: { type: Number, unique: true}
});

let Repo = mongoose.model('Repo', repoSchema);

//const newRepo = new Repo({userName: 'username', repoList: ['repo objects']})
//return newRepo.save().then
//take in the object
let save = (arrayOfRepoObjects) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  //create new instances out of repo for all of them
  let arrayOfRepoInstances = arrayOfRepoObjects.map(repo => new Repo(repo)); //.save() on end instead of return repo insert many
  //Promise.all()
  //insert all instances into the collection using insertMany
  return Repo.insertMany(arrayOfRepoInstances)
  .then(() => {
    console.log('saved repos');
  })
  .catch(error => {
    if (error.code === 11000) {
      console.error('repos already exist in the database')
    } else {
      console.error('error saving')
    }
  })
}
//access the db and get the top 25 stars
let get25 = (callback) => {
  //use find sort and limit to
  //return

  Repo.find({}).sort({ stars: -1 }).limit(25)
  .exec((error, repo25) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, repo25);
    }
  })
}

module.exports.save = save;
module.exports.get25 = get25;