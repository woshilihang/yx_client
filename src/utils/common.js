/* eslint-disable import/prefer-default-export */
import Taro from '@tarojs/taro';


/**
 * 简单判断某值是否属于某值属性或元素
 *  @param whatList Object
 *  @param who Any
 *  @returns boolean
 */
export const getSimpleIsBelone = (whatList, who) => {
  const WhatType = Object.prototype.toString.call(whatList).slice(8, -1);
  // 对象
  if (WhatType === 'Object') return whatList[who] ? true : false;
  // 数组
  if (whatList === 'Array') return whatList.includes(who);
  // 普通类型
  return String(whatList).indexOf(who) > -1;
}


/**
 * 判断一个对象是否为空对象，或者有属性，属性不为''
 * @param obj
 * @returns boolean
 */
export const isNullObj = (obj) => {
  if (Object.keys(obj).length === 0) return true;
  return Object.values(obj).filter(item => item !== '').length === 0;
};

/**
 * 从数组列表中删除某个元素，返回新的数组
 * @param {Array} arr 
 * @param {any} val 
 */
export const removeOfArr = (arr, val) => {

  if (!Array.isArray(arr)) return [];

  const isExist = arr.includes(val);
  if (!isExist) return arr;

  return arr.filter(item => item !== val);
}

/**
 * 将含有换行符\n或者\r转换成<Br/>
 * @param {String} origin_str 
 */
export const replaceSpaceToBr = (origin_str) => {
  if (!origin_str) return '';
  console.log(origin_str, 'origin_str');
  return origin_str.replace(/[\n\r]/g, '<Br />');
}

export const transLangToName = (keyMap, langList) => {

  if (!Object.keys(keyMap).length) return []

  if (typeof langList === 'string' && langList) {
    let fltArr = keyMap.filter(item => item.lang === langList && item.name)
    return fltArr[0] && fltArr[0].name
  }

  if (Array.isArray(langList)) {
    let nameList = []
    keyMap.forEach(city => {
      if (langList.includes(city.lang)) {
        nameList.push(city.name)
        langList.splice(langList.indexOf(city.lang), 1)
      }
    })
    return nameList.concat(langList)
  }
  return ''
}

/**
 * 定义绘制图片的方法
 *
 * @memberof Offer
 */
export const drawImage = async () => {
  console.log('开始绘制')
  let ctx = Taro.createCanvasContext('cardCanvas');

  // 填充背景色
  let grd = ctx.createLinearGradient(0, 0, 1, 500)
  grd.addColorStop(0, '#1452d0');
  grd.addColorStop(0.5, '#FFF');
  ctx.setFillStyle(grd);
  ctx.fillRect(0, 0, 200, 100);

  // 绘制圆形头像
  let userInfo = Taro.getStorageSync('userInfo');
  let res = await Taro.downloadFile({
    url: userInfo.avatarUrl
  });

  ctx.save();
  ctx.beginPath();
  // ctx.arc(160, 86, 66, 0, Math.PI * 2, false)
  ctx.arc(160, 88, 66, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()
  ctx.stroke()
  ctx.translate(160, 88)
  ctx.drawImage(res.tempFilePath, -66, -66, 132, 132)
  ctx.restore()

  // 绘制文字
  ctx.save()
  ctx.setFontSize(20)
  ctx.setFillStyle('#FFF')
  ctx.fillText(userInfo.nickName, 100, 200)
  ctx.setFontSize(16)
  ctx.setFillStyle('black')
  ctx.fillText('已在有话说公众号打卡20天', 50, 240)
  ctx.restore()

  // 绘制二维码
  let qrcode = await Taro.downloadFile({
    url: 'https://upload-images.jianshu.io/upload_images/3091895-f0b4b900390aec73.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/258/format/webp.jpg'
  })
  ctx.drawImage(qrcode.tempFilePath, 70, 260, 180, 180)

  // 将以上绘画操作进行渲染
  ctx.draw()

}

/**
 * saveCard() 保存图片到本地
 */
export const saveCard = async () => {
  // 将Canvas图片内容导出指定大小的图片
  let res = await Taro.canvasToTempFilePath({
    x: 0,
    y: 0,
    width: 400,
    height: 500,
    destWidth: 360,
    destHeight: 450,
    canvasId: 'cardCanvas',
    fileType: 'png'
  })
  let saveRes = await Taro.saveImageToPhotosAlbum({
    filePath: res.tempFilePath
  })
  console.log(saveRes);
  if (saveRes.errMsg === 'saveImageToPhotosAlbum:ok') {
    Taro.showModal({
      title: '图片保存成功',
      content: '图片成功保存到相册了，快去发朋友圈吧~',
      showCancel: false,
      confirmText: '确认'
    })
  } else {
    Taro.showModal({
      title: '图片保存失败',
      content: '请重新尝试!',
      showCancel: false,
      confirmText: '确认'
    })
  }
}


