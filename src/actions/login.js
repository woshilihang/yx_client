import * as constants from '../constants/login';

// 更改登录状态
export const changeAppOnlaunch = () => ({
  type: constants.CHANGE_APP_ON_LAUNCH
});

// 写入请求token
export const insertToken = (authorize) => ({
  type: constants.INSERT_AUTHORIZE,
  authorize
});