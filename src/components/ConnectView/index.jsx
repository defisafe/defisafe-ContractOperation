import React from 'react';
import sty from './index.module.scss';

export default function ConnectView({onConnect}) {

    return (
        <div className={sty.noConnect}>
            <button onClick={onConnect}>Connect Metamask</button>
        </div>
    )
}