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
  const { data, username, isLastPage } = props;

  const repos = data.map((repo, key) => {
    const ColorTag = styled.a`
      display: inline-block;
      border-radius: 100px;
      margin: 0 6px 0 0;
      width: 15px;
      height: 15px;

      ${props => `
        background: ${
          languageColors[repo.language]
            ? languageColors[repo.language]
            : languageColors.other
        };
      `};
    `;
    return (
      <div key={key}>
        <h2>
          <a href={repo.html_url} className="repo_name" target="_blank">
            {repo.name}
          </a>
        </h2>
        <p>{repo.description}</p>
        <p>
          <ColorTag />
          {repo.language}
        </p>
      </div>
    );
  });

  const Wrapper = styled.div`
    margin: 1em auto 5em;
    max-width: 680px;
  `;

  return (
    <Wrapper>
      <h1>{username} – repos</h1>
      {repos}
      {!isLastPage ? (
        <button className="load_more" onClick={props.fetchMore}>
          Load more
        </button>
      ) : null}
    </Wrapper>
  );
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
