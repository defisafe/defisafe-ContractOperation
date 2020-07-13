import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';

import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { NetworkContextName } from './constants';
import 'normalize.css';
import './style/index.scss';

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 15000
  return library
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <App />
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
