import React from 'react';

const RepoList = (props) => {
  console.log(props.repo)
  //access to prop.repo has userName,repoName,url,stars
  var repo = props.repo;
  return (
    <li>
    <h6></h6>
    User: {repo.userName}  Repo Name: {repo.repoName}  Number of Stars: {repo.stars}
    </li>
  )
}

export default RepoList;