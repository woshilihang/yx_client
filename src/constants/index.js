// 省份城市 中英文映射表
export const OPTS_CITY = [
  {
    id: 0,
    name: '全国',
    lang: '', // 空字符串默认为全国
  },
  {
    id: 1,
    name: '北京',
    lang: 'beijing'
  },
  {
    id: 2,
    name: '上海',
    lang: 'shanghai'
  },
  {
    id: 3,
    name: '广州',
    lang: 'guangzhou'
  }, 
  {
    id: 4,
    name: '深圳',
    lang: 'shenzhen'
  }, 
  {
    id: 5,
    name: '杭州',
    lang: 'hangzhou'
  },
]

export const OPTS_ORIGIN = [
  {
    id: 1,
    name: 'HR发布'
  },
  {
    id: 2,
    name: '内推'
  },
  {
    id: 3,
    name: '找替班'
  }
]

export const OPTS_JOB = [
  {
    id: 1,
    name: '全部',
    lang: 'all'
  },
  {
    id: 2,
    name: '运营',
    lang: 'business'
  },
  {
    id: 3,
    name: '技术',
    lang: 'skill'
  },
  {
    id: 4,
    name: '职能',
    lang: 'operate'
  },
  {
    id: 5,
    name: '市场',
    lang: 'market'
  },
  {
    id: 6,
    name: '设计',
    lang: 'design'
  },
  {
    id: 7,
    name: '金融',
    lang: 'finance'
  },
]

// 测试数据
export const serverData = [
  {
    id: 1,
    title: '出海电商增长运营实习生',
    company: '小米',
    origin: '内推',
    jobs: '运营',
    address: '北京',
    img: 'https://uploadfiles.nowcoder.com/images/20180918/4107856_1537253829973_FE8E552D9F284C2F083267D8EC135526'
  },
  {
    id: 2,
    title: '前端开发实习生',
    company: '腾讯',
    origin: '内推',
    jobs: '运营',
    address: '北京',
    img: 'https://uploadfiles.nowcoder.com/files/20190715/9398821_1563179722928_120.png'
  },
  {
    id: 3,
    title: 'JAVA开发工程师',
    company: '阿里',
    origin: '内推',
    jobs: '运营',
    address: '北京',
    img: 'https://uploadfiles.nowcoder.com/images/20180917/4107856_1537180998772_EA0EB791BBE9BECA5981335580CD0F58'
  },
  {
    id: 4,
    title: '产品与运营实习生',
    company: '字节跳动',
    origin: '内推',
    jobs: '运营',
    address: '北京',
    img: 'https://uploadfiles.nowcoder.com/files/20191129/4107856_1575019780091_60x60.png'
  },
  {
    id: 5,
    title: '大数据分析实习生',
    company: '百度',
    origin: '内推',
    jobs: '运营',
    address: '北京',
    img: 'https://uploadfiles.nowcoder.com/images/20180917/4107856_1537181125149_471D6CEB9F3691513D7B5CE2545E1818'
  },
  {
    id: 6,
    title: '商业产品经理',
    company: '美团',
    origin: 'HR发布',
    jobs: '产品',
    address: '北京',
    img: 'https://uploadfiles.nowcoder.com/files/20190629/4107856_1561788901920_120x120.png'
  },
  {
    id: 7,
    title: '数据分析师',
    company: '京东',
    origin: 'HR发布',
    jobs: '职能',
    address: '北京',
    img: 'https://uploadfiles.nowcoder.com/images/20180917/4107856_1537181614088_15ADCE1EF9544F27FFAF92B10CF15BF5'
  },
];