// 统一管理小程序所有客户端请求

import http from './utils/http';

// 查询内推信息列表
export const findAllJobsList = () => http.get('/jobs/list');

// 查询内推详情
export const fetchJobDetail = (job_id) => http.get('/job/detail', {
  data: {
    job_id
  }
});

// 我的
export const fetchUserPublish = async () => http.get('/user/publish');

export const publishUserCopy = async params => http.post('/user/publishCopy', params);

// /user/getCopyList
export const fetchUserCopy = async () => http.get('/user/getCopyList');
