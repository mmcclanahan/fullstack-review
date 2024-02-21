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
    //try put modifications here
    axios.post('/repos', { userName: term })
    .then(() => {
      return axios.get('/repos')
    })
    .then((response) => {
      setRepos(response.data);
    })
    .catch((err) => {
      console.error('Failed to set repos ', err);
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