import React from 'react';
import { chainIds } from '../../constants';
import { useActiveWeb3React } from '../../hooks'
import { InjectedConnector } from '@web3-react/injected-connector';
import { UnsupportedChainIdError } from '@web3-react/core';

import style from './index.module.scss';

export default function Insure() {
  const { account, chainId, activate } = useActiveWeb3React();

  function activeWall() {
    let connector = new InjectedConnector({
      supportedChainIds: [1, 3, 4, 5, 42]
    });
    activate(connector, undefined, true).catch(error => {
      console.log(error)
      if (error instanceof UnsupportedChainIdError) {
        activate(connector)
      } else {
        alert(1111)
      }
    })
  }
  
  return (
    <div className={style.insure}>
      <div className={style.head}>
        <div>{chainIds[chainId]}</div>
        {
          account ? <div>{account}</div> : <button onClick={activeWall}>login</button>
        }
        <div>{account}</div>
      </div>
    </div>
  )
}