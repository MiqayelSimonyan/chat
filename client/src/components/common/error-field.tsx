import React, { FunctionComponent, memo } from 'react';

import 'assets/styles/layout/error-field.scss';
import { IIndexSignature } from 'types/global/index-signature';

type Props = {
  touched: IIndexSignature<any>;
  errors: IIndexSignature<any>;
  fieldName: string;
}

const ErrorField: FunctionComponent<Props> = ({ touched, errors, fieldName }) => {
  return touched[fieldName] && errors[fieldName] ? (
    <span className='col-md-12 error-field'>{errors[fieldName]}</span>
  ) : null;
};

export default memo(ErrorField);