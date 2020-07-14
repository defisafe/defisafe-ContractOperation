import React from 'react';
import sty from './index.module.scss';
import cn from 'classnames';

export default function Head({net, address}) {
    return (
        <div className={cn(sty.head, 'flex-m')}>
            <div className={sty.net}>{net}</div>
            <div className={cn('flex-1', sty.state)}>
                <div className={cn('account')}>{address}</div>
            </div>
        </div>
    )
}