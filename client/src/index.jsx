import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';


const App = () => {

  const [repos, setRepos] = useState([]);

  useEffect(()=> {
    axios.get('/repos')
    .then(results => {
      console.log(results.data,'success axios')
      setRepos(results.data);
    })
    .catch(error => {
      console.log('app couldnt get repos')
    })
  }, []);

  const search = (term) => {
    console.log(`${term} was searched`);
    axios.post('/repos', { 'userName': term })
    .then(function(response) {
      console.log(response,'axiospost app.jsx')
      // use get method setRepos(response.data);
      axios.get('/repos')
    .then(results => {
      setRepos(results);
    })
    .catch(error => {
      console.log('app couldnt get repos')
    })
    })
    .catch(function(error) {
      console.log(error, 'axiospost error')
    })
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={search}/>
      <ol>
        {repos.map((repo) => (
        <RepoList key={repo.id} repo={repo} />
        ))}
      </ol>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));