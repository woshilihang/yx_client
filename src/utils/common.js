/* eslint-disable import/prefer-default-export */

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

  if(!Array.isArray(arr)) return [];

  const isExist = arr.includes(val);
  if(!isExist) return arr;

  return arr.filter(item => item !== val);
}

/**
 * 将含有换行符\n或者\r转换成<Br/>
 * @param {String} origin_str 
 */
export const replaceSpaceToBr = (origin_str) => {
  return origin_str.replace(/[\n\r]/g, '<Br />');
}