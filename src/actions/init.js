import * as constants from '../constants/init';

// 更改用户是否已经授权
export const initAppAuth = (payload = true) => ({
  type: constants.INIT_APP_AUTH,
  payload
});

export const initToken = ({});