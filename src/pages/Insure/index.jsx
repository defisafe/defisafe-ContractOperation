import React, { useState } from 'react';
import { Contract } from '@ethersproject/contracts';
import { chainIds } from '../../constants';
import { useActiveWeb3React } from '../../hooks'
import { InjectedConnector } from '@web3-react/injected-connector';
import { UnsupportedChainIdError } from '@web3-react/core';
import ConnectView from '../../components/ConnectView';
import { BigNumber } from '@ethersproject/bignumber';
import Head from '../../components/Head';
import useInput from '../../hooks/useInput';
import cn from 'classnames';
import ERC20_abi from '../../constants/erc20';

import insureSty from './index.module.scss';

//处理地址
function shortAddr(addr) {
  if (addr) {
    addr = addr.slice(0, 6) + '...' + addr.slice(-4, -1);
  }
  return addr;
}

//转换成数组
function toFixedStr(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}

export default function Insure() {
  const { account, chainId, activate, library } = useActiveWeb3React();
  let ctAddr = useInput();
  let ctAbi = useInput();
  let ctMethod = useInput();
  let ERCAddr = useInput();
  let approveAddr = useInput();
  let approveNum = useInput();
  let [paramsArr, setParamsArr] = useState([{ value: '' }]);

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

  function addParams() {
    let arr = [...paramsArr];
    arr.push({ value: '' });
    setParamsArr(arr);
  }

  function inputChange(e, i) {
    const { value } = e.target;
    let arr = [...paramsArr];
    arr[i].value = value;
    setParamsArr(arr);
  }

  function runContract(type) {
    
    let ct = new Contract(ctAddr.value, ctAbi.value, library.getSigner(account).connectUnchecked());
    console.log(ct);
    if(type == 'call') {
      if (paramsArr.length == 1 && !paramsArr[0].value) {
        ct.callStatic[ctMethod.value]().then(res => {
          alert('res:' + res);
        });
      } else {
        ct.callStatic[ctMethod.value](paramsArr.map(e => e.value).join(), { value: '0' }).then(res => {
          alert('res:' + res);
        });
      }
    } else {
      if (paramsArr.length == 1 && !paramsArr[0].value) {
        ct[ctMethod.value]().then(res => {
          alert('res' + res);
        });
      } else {
        console.log(...paramsArr.map(e => e.value))
        ct[ctMethod.value](...paramsArr.map(e => e.value), { value: 0, gasLimit: '10000000' }).then(res => {
          alert('res' + res);
        });
      }
    }
  }

  async function approve() {
    let ct = new Contract(ERCAddr.value, ERC20_abi, library.getSigner(account).connectUnchecked());

    let approveNumber = await ct.allowance(account, approveAddr.value);
    
    if (approveNumber.toString() != 0) {
      await ct.approve(approveAddr.value, BigNumber.from([0]));
      let res = await ct.approve(approveAddr.value, BigNumber.from(toFixedStr(approveNum.value * 1e18)+''));
      alert(res);
    } else {
      let res = await ct.approve(approveAddr.value, BigNumber.from(toFixedStr(approveNum.value * 1e18)+''));
      alert(res);
    }
  }

  return (
    <div className={insureSty.insure}>
      {
        account ? (
          <>
            <Head net={chainIds[chainId]} address={shortAddr(account)}></Head>
            <div className={cn(insureSty.content, 'flex')}>
              <div className={insureSty.left}>
                <div className={insureSty.form}>
                  <div className={insureSty.formGroup}>
                    <span className={insureSty.label}>合约地址：</span>
                    <input {...ctAddr} className={insureSty.formInput} type="text" />
                  </div>
                  <div className={insureSty.formGroup}>
                    <span className={insureSty.label}>合约abi：</span>
                    <textarea {...ctAbi} className={insureSty.formInput} name="" id="" cols="30" rows="10"></textarea>
                  </div>
                  <div className={insureSty.formGroup}>
                    <span className={insureSty.label}>合约方法：</span>
                    <input {...ctMethod} className={insureSty.formInput} type="text" />
                  </div>
                  {
                    paramsArr.map((e, i) => (
                      <div className={insureSty.formGroup}>
                        <span className={insureSty.label}>方法参数：</span>
                        <input value={e.value} onChange={(e) => { inputChange(e, i) }} className={insureSty.formInput} type="text" />
                        <button onClick={addParams}>添加参数</button>
                      </div>
                    ))
                  }
                  <div>
                    <button onClick={() => { runContract('call') }} style={{ marginRight: '10px' }}>call运行</button>
                    <button onClick={() => { runContract('send') }}>send运行</button>
                  </div>
                </div>
              </div>
              <div className={insureSty.right}>
                <div className={insureSty.title}>授权方法</div>
                <div className={insureSty.form}>
                  <div className={insureSty.formGroup}>
                    <span className={insureSty.label}>erc20token地址：</span>
                    <input {...ERCAddr} className={insureSty.formInput} type="text" />
                  </div>
                  <div className={insureSty.formGroup}>
                    <span className={insureSty.label}>授权地址：</span>
                    <input {...approveAddr} className={insureSty.formInput} type="text" />
                  </div>
                  <div className={insureSty.formGroup}>
                    <span className={insureSty.label}>授权个数：</span>
                    <input {...approveNum} className={insureSty.formInput} type="text" />
                  </div>
                  <div>
                    <button onClick={approve}>授权</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : <ConnectView onConnect={activeWall}></ConnectView>
      }

    </div>
  )
}