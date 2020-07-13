import React from 'react';
import { chainIds } from '../../constants';
import { useActiveWeb3React } from '../../hooks'
import { InjectedConnector } from '@web3-react/injected-connector';
import { UnsupportedChainIdError } from '@web3-react/core';
import cn from 'classnames';

import insureSty from './index.module.scss';

//处理地址
function shortAddr(addr) {
  // addr = addr.splice(0, 6) + '...' + addr.splice(-1, -4);
  return addr;
}

export default function Insure() {
  const { account, chainId, activate } = useActiveWeb3React();

  console.log(account)

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
    <div className={insureSty.insure}>
      {
        account ? (
          <>
            <div className={cn(insureSty.head, 'flex-m')}>
              <div className={insureSty.net}>{chainIds[chainId]}</div>
              <div className={cn('flex-1', insureSty.state)}>
                <div className={cn('account')}>{shortAddr(account)}</div>
              </div>
            </div>
            <div className={cn(insureSty.content, 'flex')}>
              <div className={insureSty.left}>
                <div className={insureSty.form}>
                  <div className={insureSty.formGroup}>
                    <span className={insureSty.label}>合约地址：</span>
                    <input className={insureSty.formInput} type="text"/>
                  </div>
                  <div className={insureSty.formGroup}>
                    <span className={insureSty.label}>合约abi：</span>
                    <textarea className={insureSty.formInput} name="" id="" cols="30" rows="10"></textarea>
                  </div>
                  <div className={insureSty.formGroup}>
                    <span className={insureSty.label}>合约方法：</span>
                    <input className={insureSty.formInput} type="text"/>
                  </div>
                  <div className={insureSty.formGroup}>
                    <span className={insureSty.label}>方法参数：</span>
                    <input className={insureSty.formInput} type="text"/>
                  </div>
                  <div>
                    <button style={{marginRight: '10px'}}>call运行</button>
                    <button>send运行</button>
                  </div>
                </div>
              </div>
              <div className={insureSty.right}>

              </div>
            </div>
          </>
        ) : (
            <div className={insureSty.noConnect}>
              <button onClick={activeWall}>Connect Metamask</button>
            </div>
          )
      }

    </div>
  )
}