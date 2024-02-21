const mongoose = require('mongoose');
//db named fetcher // like create database chat
//use fetcher
mongoose.connect('mongodb://localhost/fetcher');
//repoSchema like table schema
let repoSchema = mongoose.Schema({
  userName: String,
  repoName: String,
  url: String,
  stars: Number,
  id: { type: Number, unique: true}
});
//create a model to use to create instances of it (documents)that get stored in fetcher
//it creates 'repos'
let Repo = mongoose.model('Repo', repoSchema);

//Repo.create  creates new document and saves it to database in single step
//new Repo creates new document   then .save or orther functions saves it to the database
//always return a promise from a sync function
let save = (arrayOfRepoObjects) => {
  return Repo.create(arrayOfRepoObjects);
  /* or
  return Promise.all(arrayOfRepoObjects.map(repo => {
    return new Repo(repo).save()
  }))
  */
  /* this was my working code
  let arrayOfRepoInstances = arrayOfRepoObjects.map(repo => new Repo(repo));
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
  })*/
}

//access the db and get the top 25 stars
let get25 = () => {
  return Repo.find({})
    .sort({ stars: -1 })
    .limit(25)
    .exec()
}

module.exports.save = save;
module.exports.Repo = Repo;
module.exports.get25 = get25;