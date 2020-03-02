import Taro from '@tarojs/taro';
import * as constants from '../constants/init';

const hasInitStorage = Taro.getStorageSync('hasInit');
console.log('hasInitStorage', hasInitStorage);

const INIT_STATE = {
  hasInit: hasInitStorage, // storage的hasInit初始化
}

const init = (state = INIT_STATE, action) => {
  switch(action.type) {
    case constants.INIT_APP_AUTH:
      return {
        ...state,
        hasInit: action.payload
      };
    default:
      return state;
  }
};

export default init;