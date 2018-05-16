import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import App from './App';

// eslint-disable-next-line
injectGlobal`
  html {
    font-size: 16px;
  }
  body {
    margin: 0;
    font-family: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';
  }
`;

ReactDOM.render(<App />, document.getElementById('root'));
