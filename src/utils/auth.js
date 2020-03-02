import Taro from '@tarojs/taro';
import { insertToken, changeAppOnlaunch } from '../actions/login';

// 获取数据
export default class Auth {
  // app授权
  static appCheckAuth() {
    return new Promise((resolve) => {
      const state = Taro.$store.getState();
      // 如果有授权信息
      if(Auth.checkAuth() && !state.app.appOnLaunch) {
        // 直接返回
        resolve(true);
      } else {
        // 判断session_key是否过期
        Taro.checkSession().then(async () => {
          // 未过期检查token是否有效
          if(!Auth.checkAuth()) {
            // 判断是否token请求成功
            let flag = await Auth.getAuthToken();
            if(flag) {
              Taro.$store.dispatch(changeAppOnlaunch());
              resolve(true);
            } else {
              // 提示
              Taro.showToast({
                title: '获取授权信息失败',
                icon: 'none',
                mask: true
              });
            }
          } else {
            // 第一次进来
            // 更新app状态
            Taro.$store.dispatch(changeAppOnlaunch());
            // token没有过期，直接返回
            resolve(true);
          }
        }).catch(err => {
          console.log(err);
          // TODO: 用户登录态过期，需要在一次Taro.login
        })
      }
    });
  }

  // 授权用户token
  static async getAuthToken() {
    const state = Taro.$store.getState();
    // login
    let res = await Taro.login();
    // 获取token
    let response = await Taro.request({
      url: `${state.login.baseURL}api/xxxx/xx`,
      data: {
        code: res.code
      },
      method: 'POST',
    });
    // 判断是否写入成功
    if(response.data.data && response.data.data.authorize) {
      //写入token
      let authorize = response.data.data.authorize;
      Auth.saveAuthToken(authorize);
      return true;
    } else {
      console.log('获取token失败');
      return false;
    }
  }

  static saveAuthToken (authorize) {
    // 写入状态管理
    Taro.$store.dispatch(insertToken(authorize));
    //写入缓存
    Taro.setStorageSync('authorize',authorize)
  }

  // 检查令牌是否有效 true - 有效 false - 无效
  static checkAuth() {
    const state = Taro.$store.getState();
    // 从缓存读取授权信息
    let authorize = state.authorize || Taro.getStorageSync('authorize') || {},
      expiryTime = 0,
      nowTime = ~~(Date.now() / 1000);
    
    if(authorize.exp) {
      expiryTime = authorize.exp;
    }

    return expiryTime - nowTime > 300;
  }

  // 获取token
  static getToken() {
    const state = Taro.$store.getState();
    let authorize = state.authorize ||  Taro.getStorageSync('token');
    return authorize.token;
  }
}