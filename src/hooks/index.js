import { useEffect, useState } from 'react';
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { NetworkContextName } from '../constants';
import { InjectedConnector } from '@web3-react/injected-connector';

export function useActiveWeb3React() {
  const context = useWeb3ReactCore()
  const contextNetwork = useWeb3ReactCore(NetworkContextName)
  return context.active ? context : contextNetwork
}

let injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

export function useEagerConnect() {
  const { activate, active } = useWeb3ReactCore();
  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then(isAuthorized => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        if (window.ethereum) {
          // activate(injected, undefined, true).catch(() => {
          //   setTried(true)
          // })
        } else {
          setTried(true)
        }
      }
    })
  }, [activate])

  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried;
}