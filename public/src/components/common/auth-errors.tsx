import React, { FunctionComponent, memo } from 'react';

import { IIndexSignature } from 'types/global/index-signature';

type Props = {
    errors: IIndexSignature<string>;
    className: string;
};

const AuthErrors: FunctionComponent<Props> = ({ errors, className }) => {
    if (!Object.keys(errors).length) return null;

    return (
        <>
            {
                Object.keys(errors).map((error, index) => {
                    return <h5 key={index} className={className}>{errors[error]}</h5>
                })
            }
        </>
    );
};

export default memo(AuthErrors);