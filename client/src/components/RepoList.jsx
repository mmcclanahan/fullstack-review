import React from 'react';

const RepoList = (props) => {
  console.log(props.repo)
  //access to prop.repo has userName,repoName,url,stars
  var repo = props.repo;

  return (
    <li>

      {repo.userName}'s  <a href={repo.url}>{repo.repoName}</a> has {repo.stars} stars.

    </li>
  )
}

export default RepoList;