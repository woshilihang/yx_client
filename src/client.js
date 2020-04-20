// 统一管理小程序所有客户端请求

import http from './utils/http';

// 查询内推信息列表
export const findAllJobsList = () => http.get('/jobs/list');


// 我的
export const fetchUserPublish = async () => http.get('/user/publish');

export const publishUserCopy = async params => http.post('/user/publishCopy', params);

// /user/getCopyList
export const fetchUserCopy = async () => http.get('/user/getCopyList');

export const fetchUserInfo = async () => http.get('/user/info');

// 按照模块分类处理
// 内推信息专区模块接口
// 查询内推列表
export const fetchJobList = async url => http.get(url);
// 查询内推详情
export const fetchJobDetail = params => http.get('/job/detail', params);
// 发布内推信息
export const fetchJobpublish = params => http.post('/job/publish', params)


// 沸点专区模块接口
export const fetchPinsList = async url => http.get(url);

export const fetchPinsPublish = params => http.post('/pins/publish', params)

// 沸点详情
export const fetchPinsDetail = params => http.get('/pins/detail', params)

// 沸点点赞
export const fetchPinsPrize = params => http.post('/pins/prize', params)