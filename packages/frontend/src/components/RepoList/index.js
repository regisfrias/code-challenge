import React from 'react';
import styled from 'styled-components';
import { number, string, shape, arrayOf, func, bool } from 'prop-types';

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  HTML: '#e34c26',
  CSS: '#563d7c',
  shell: '#89e051',
  other: '#949494',
};
const RepoList = props => {
  const { data } = props;

  const repos = data.map(repo => (
    <div key={repo.id}>
      <h2>
        <a src={repo.html_url} target="_blank">
          {repo.name}
        </a>
      </h2>
      <p>{repo.description}</p>
      <p>{repo.language}</p>
    </div>
  ));

  return <div>{repos}</div>;
};

RepoList.propTypes = {
  username: string.isRequired,
  data: arrayOf(
    shape({
      id: number,
      name: string,
      html_url: string,
      language: string,
    }),
  ).isRequired,
  fetchMore: func.isRequired,
  isLastPage: bool.isRequired,
};

export default RepoList;
