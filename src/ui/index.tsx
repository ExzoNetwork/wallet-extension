import React from 'react';
import ReactDOM from 'react-dom';
import { browser } from 'webextension-polyfill-ts';
import App from './views';
import { noop } from 'ui/utils';

import './index.less';

if (process.env.BUILD_ENV === 'START') {
  const wallet = new Proxy(
    {},
    {
      get: () => noop,
    }
  );
  ReactDOM.render(<App wallet={wallet} />, document.getElementById('root'));
} else {
  browser.runtime.getBackgroundPage().then((win) => {
    ReactDOM.render(
      <App wallet={win?.wallet} />,
      document.getElementById('root')
    );
  });
}