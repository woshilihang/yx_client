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

// 