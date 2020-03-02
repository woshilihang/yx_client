import Taro from '@tarojs/taro';
import Auth from './auth';


// 请求封装
async function request(url='', reqData = {}, method = 'POST') {
  const state = Taro.$store.getState();
  const header = {};

  if(!url.trim()) {
    Taro.showModal({
      title: '出错了',
      content: '请求接口地址不能为空！',
      showCancel: false,
    });
    return ;
  }

  // must data
  const defData = {};

  // data
  const data = Object.assign({}, defData, reqData );

  // header 'Bearer ' + Taro.getStorageSync('TOKEN')
  header = {
    authorization: Auth.getToken(),
  }

  // request
  let res = await Taro.request({
    url: `${state.app.baseURL}${url}`,
    data,
    header,
    method,
  });

  return new Promise(resolve => {
    if(res.statusCode === 200) {
      if(res.data.error === -1) {
        Taro.showModal({
          title: '出错了',
          content: res.data.error_reason,
          showCancel: false
        })
      } else {
        resolve(res.data);
      }
    } else {
      Taro.showModal({
        title: '出错了',
        content: '服务器繁忙',
        showCancel: false
      })
    }
  })


}

export default request;