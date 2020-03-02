import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Image, Button, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { initAppAuth } from '../../actions/init'
import AuthModal from '../../components/Modal';
import pageInit from '../../components/pageInit';

import './index.less'
import msgIcon from '../../public/images/msg.png'
import testImg from '../../public/images/test.jpeg'

import JDItem from '../../components/JDItem/index'
// import MyLoading from '../../components/Loading/index'

const defaultConfig = {
  search_txt: '搜索职位或公司名称',
}

const serverData = [
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

const mapState = ({ init }) => ({
  hasInit: init.hasInit
});


@connect(mapState, (dispatch) => ({
  onInitAppAuth() {
    dispatch(initAppAuth())
  },
}))
@pageInit()
class Index extends Component {
  state = {
    search_val: '',
    jobs_list: [],
    jobTotalNum: 0,
    currPageNum: 1,
    optsJobs_list: [
      {
        id: 1,
        name: '全部',
        job: 'all'
      },
      {
        id: 2,
        name: '运营',
        job: 'business'
      },
      {
        id: 3,
        name: '技术',
        job: 'skill'
      },
      {
        id: 4,
        name: '职能',
        job: 'operate'
      },
      {
        id: 5,
        name: '市场',
        job: 'market'
      },
      {
        id: 6,
        name: '设计',
        job: 'design'
      },
      {
        id: 7,
        name: '金融',
        job: 'finance'
      },
    ],
    active: 'all', // 当前作用于哪一个Job
    loading: true, // 是否显示loading
    canShare: true, // 是否允许分享
    isInitShow: true, // 控制是否显示
    userInfo: {},
  }


  componentDidMount() {
    console.log('loading -- ', this.state.loading);
    console.log(this.props.init);
    Taro.showLoading({
      title: '加载中...'
    })
    // setTimeout(() => {
    //   let jobData = Array.from({ length: 10 }, () => {
    //     return serverData[Math.floor(Math.random() * 7)]
    //   });
    //   console.log(jobData, 'jobData');
    //   this.setState({
    //     jobs_list: jobData,
    //     loading: false
    //   });
    //   Taro.hideLoading()
    // }, 1000);
    // 做初始化获数据
    const { currPageNum, active } = this.state;
    Taro.request({
      url: `http://localhost:5000/job/list?job_type=${active}&nextPageNum=${currPageNum}`,
    }).then(res => {
      Taro.hideLoading()
      console.log(res.data);
      if(res.data.code === 200) {
        this.setState({
          loading: false,
          jobs_list: res.data.data.list,
          jobTotalNum: res.data.data.total,
          currPageNum: res.data.data.currentNum
        });
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '友享社区',
  }
  //分享
  onShareAppMessage() {
    return {
      title: 'this page shareMessage'
    }
  }

  handleSearchInput = (evt) => {
    console.log(evt);
    this.setState({
      search_val: evt.detail.value
    }, () => {
      console.log('search_val 搜索内容为', this.state.search_val)
    })
  }

  handleOptsJobClick = (optsJob) => {
    console.log(optsJob);
    const { job } = optsJob;
    const { jobs_list } = this.state;
    this.setState({
      active: job,
      loading: true
    }, () => {
      // 调用接口
      console.log('回调')
      setTimeout(() => {
        let jobData = Array.from({ length: 10 }, () => {
          return jobs_list[Math.floor(Math.random() * 7)]
        });
        console.log(jobData, '随机打乱的岗位集合');
        this.setState({
          jobs_list: jobData,
          loading: false
        });
      }, 1000);
    });
  }

  handleChangeInitState = () => {
    this.props.onInitAppAuth();
  }

  handlePublishClick = () => {
    console.log('去发布')
    Taro.navigateTo({
      url: '/pages/publish/index'
    })
  }

  updateList = () => {
    console.log('触发了下拉刷新。。。')
    if (this.state.loading) return
    this.setState({
      loading: true
    })
    Taro.showLoading({
      title: '加载中'
    })
    setTimeout(() => {
      let jobData = Array.from({ length: 10 }, () => {
        return serverData[Math.floor(Math.random() * 7)]
      });
      this.setState({
        jobs_list: jobData,
        loading: false
      });
      Taro.hideLoading()
    }, 1000);
    // 重新1刷新数据
    // Taro.request({
    //   url: ''
    // }).then(res => {
    //   Taro.hideLoading()
    //   if(res.data.success) {
    //     this.setState({
    //       jobs_list: res.data.data,
    //       loading: false
    //     });
    //   }
    // })
  }

  appendNextPageList = () => {
    console.log('触发了上拉加载。。。')
    if (this.state.loading) return
    this.setState({
      loading: true
    })
    Taro.showLoading({
      title: '加载中'
    })
    setTimeout(() => {
      let jobData = Array.from({ length: 10 }, () => {
        return serverData[Math.floor(Math.random() * 7)]
      });
      this.setState({
        jobs_list: this.state.jobs_list.concat(jobData),
        loading: false
      });
      Taro.hideLoading()
    }, 1000);
    // 获取下一页数据
    // Taro.request({
    //   url: ''
    // }).then(res => {
    //   Taro.hideLoading()
    //   if(res.data.success) {
    //     this.setState({
    //       jobs_list: this.state.jobs_list.concat(res.data.data),
    //       loading: false
    //     });
    //   }
    // })
  }

  goToJobDetailPage = (id) => {
    Taro.navigateTo({
      url: `/pages/job_detail/index?jobId=${id}`
    })
  }

  /**
 *  处理用户授权信息
 * @param userData 获取到的用户授权信息
 */
  prcoessAuthResult = (userData) => {
    const { userInfo = '', encryptedData, iv } = userData;
    console.log('userdata ---', userData);
    if (userInfo) {
      // Taro.setStorageSync('userInfo', userInfo);
      // Taro.setStorageSync('hasInit', true);
      // this.props.onInitAppAuth(true);
      // 用户数据入库
      Taro.login({
        success: loginRes => {
          Taro.request({
            url: 'http://localhost:5000/user/login',
            data: {
              code: loginRes.code,
              encryptedData,
              iv,
              userInfo,
            },
            success: (res) => {
              // TODO: 未被正确执行
              console.log('成功了 --')
              const { data } = res;
              Taro.showModal({
                title: '登录成功',
                content: data.message
              });
              Taro.setStorageSync('TOKEN', data.Token);
              // Taro.$globalData.userInfo = userRes.userInfo;
              this.setState({
                userInfo
              });
              Taro.setStorageSync('userInfo', userInfo);
              Taro.setStorageSync('hasInit', true);
              this.props.onInitAppAuth(true);
            },
            fail: (err) => {
              console.log('授权失败', err);
              Taro.showModal({
                title: '授权失败',
                content: '请重新登录'
              });
            }
          })
        }
      })
    }
  }

  hideAuthModal = () => {
    Taro.setStorageSync('hasInit', false);
    this.setState({
      isInitShow: false
    })
  }

  render() {
    const { active, isInitShow } = this.state;
    return (
      <View>
        {
          (isInitShow && !this.props.hasInit) && (<AuthModal
            title='授权提示'
            contentText='Taro社区邀您完成授权，尊享时尚奢华之旅'
            onCancelCallback={this.hideAuthModal}
            onConfirmCallback={this.prcoessAuthResult}
            isAuth='true'
          />)
        }
        <ScrollView
          className='jd_lists'
          scrollY
          scrollWithAnimation
          scrollTop='0'
          lowerThreshold='10'
          upperThreshold='0'
          onScrolltoupper={this.updateList}
          onScrolltolower={this.appendNextPageList}
          style={{
            height: '750px'
          }}
        >
          <View className='index'>
            {/* <MyLoading visible={this.state.loading} /> */}
            <View className='header'>
              <View className='header_address'>
                <Text onClick={this.handleChangeInitState}>全国</Text>
              </View>
              <View className='header_search'>
                <Input placeholderClass='header_search_input-placeholder' className='header_search_input' onInput={this.handleSearchInput} placeholder={defaultConfig.search_txt} value={this.state.search_val} />
              </View>
              <Image className='header_msg' src={msgIcon} />
            </View>

            {/* banner广告区域 */}
            <View className='banner'>
              <Image className='banner_img' src={testImg} />
            </View>

            {/* 模块岗位划分 */}
            <View className='opts_jobs_list'>
              {
                this.state.optsJobs_list.map(optsJob => (
                  <View className={`opts_job_item ${active === optsJob.job ? 'actived' : ''}`} key={optsJob.id}
                    onClick={() => this.handleOptsJobClick(optsJob)}
                  >
                    <Text>
                      {
                        optsJob.name
                      }
                    </Text>
                  </View>
                ))
              }
            </View>

            {/* 列表 */}
            <View className='jd_item_list'>
              {
                this.state.jobs_list.map(job_item => (
                  <JDItem
                    key={job_item.id}
                    {...job_item}
                    onGo={this.goToJobDetailPage}
                  />
                ))
              }
            </View>

            <Button className='btn btn-pub'
              onClick={this.handlePublishClick}
              type='default'
              plain='true'
              size='mini'
            >
              发布
          </Button>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Index
