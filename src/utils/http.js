import Taro from '@tarojs/taro';
import { rootUrl } from '../config';


// 请求封装
async function http({ url = '', reqData = {}, method = 'POST' } = {}) {
  let header = {};
  console.log(url, url)
  if (!url.trim()) {
    Taro.showModal({
      title: '出错了',
      content: '请求接口地址不能为空！',
      showCancel: false,
    });
    return;
  }

  // must data
  const defData = {};

  let data;
  // data
  // get请求，传过来的reqData拼接到url上
  if (method === 'GET' || method === 'get') {
    let urlStr = url.includes('?') ? '&' : '?';
    for (let key in reqData) {
      urlStr += `${key}=${reqData[key]}&`;
    }
    urlStr = urlStr.slice(0, -1);
    url = `${url}${urlStr}`;
    data = {};
  } else {
    data = Object.assign({}, defData, reqData);
  }

  // header 'Bearer ' + Taro.getStorageSync('TOKEN')
  header = {
    authorization: 'Bearer ' + Taro.getStorageSync('TOKEN'),
  }

  // request
  let res = await Taro.request({
    url: `${rootUrl}${url}`,
    data,
    header,
    method,
  });

  return new Promise(resolve => {
    if (res.statusCode === 200) {
      if (res.data.code === 200) {
        resolve(res.data.data);
      } else {
        Taro.showModal({
          title: '出错了',
          content: res.data.message,
          showCancel: false
        })
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

export default {
  get: (url, data = {}) => {
    console.log('request-get ---', url)
    return http({
      url,
      reqData: data,
      method: 'GET'
    });
  },

  post: (url, data = {}) => {
    console.log('request-post ---', url)
    return http({
      url,
      reqData: data,
      method: 'POST'
    });
  }
};