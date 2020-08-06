import { IIndexSignature } from "types/global/index-signature";

const validate = (values: IIndexSignature<any>) => {
  const errors: IIndexSignature<any> = {};
  const { username, password } = values;

  if (!username) {
    errors.username = 'Username Is Required';
  } else if (username.length < 6) {
    errors.username = 'Username must be at least 6 characters in length';
  };

  if (!password) {
    errors.password = 'Password Is Required';
  } else if (!/(?=.*[a-z])/.test(password)) {
    errors.password = 'Password must contain letter';
  } else if (!/(?=.*[0-9])/.test(password)) {
    errors.password = 'Password must contain digit';
  } else if (password.length < 4) {
    errors.password = 'Password must be at least 4 characters in length';
  };

  return errors;
};

export default validate;