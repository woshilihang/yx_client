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
import http from '../../utils/http';
import { OPTS_JOB } from '../../constants';
import { fetchJobList } from '../../client';
import { rootUrl } from '../../config';
import MySwiper from '../../components/MySwiper';

const defaultConfig = {
  search_txt: '搜索职位或公司名称',
}

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
    active: 'all', // 当前作用于哪一个Job
    loading: true, // 是否显示loading
    canShare: true, // 是否允许分享
    isInitShow: true, // 控制是否显示
    userInfo: {},
    isConfirmPublish: false, // 用户身份是否已认证发布内推信息权限
    banner: [
      {
        image_src: 'https://uploadfiles.nowcoder.com/images/20200402/999991356_1585799795866_28DE56E2E0E633977DE098EED7B10848'
      },
      {
        image_src: 'https://uploadfiles.nowcoder.com/images/20191115/999991356_1573798849904_2D17C168A3C204ACB9D89CA6B517DB73',
      },
      // {
      //   image_src: 'https://uploadfiles.nowcoder.com/images/20200402/733846638_1585833849926_1E6EE0263D6B633F536FB40A12C74CF9',
      // },
      // {
      //   image_src: 'https://uploadfiles.nowcoder.com/images/20200402/733846638_1585833817713_18D66393E9DABAC4FD8D11982652CAA1',
      // },
      // {
      //   image_src: 'https://uploadfiles.nowcoder.com/images/20200402/733846638_1585833797877_5DB44111675E6F96443F48553097FEEF'
      // }
    ]
  }


  async componentDidMount() {
    console.log('loading -- ', this.state.loading);
    console.log(this.props.init);

    Taro.showLoading({
      title: '加载中...'
    })
    await this.fetchJobListHandle()
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

  fetchJobListHandle = async () => {
    const { active, currPageNum } = this.state;
    let res = await fetchJobList(`/job/list?job_type=${active}&nextPageNum=${currPageNum}`);
    const { list, total, currentNum } = res;
    Taro.hideLoading();
    this.setState({
      loading: false,
      jobs_list: list,
      jobTotalNum: total,
      currPageNum: currentNum
    });
  }

  handleOptsJobClick = (optsJob) => {
    const { lang } = optsJob;
    // 点击自身不重新请求
    if (lang === this.state.active) return
    this.setState({
      active: lang,
      loading: true,
      currPageNum: 1,
    }, async () => {
      await this.fetchJobListHandle()
    });
  }

  handleChangeInitState = () => {
    this.props.onInitAppAuth();
  }

  handlePublishClick = async () => {
    // console.log('去发布 触发身份验证');
    await http.get('/user/msg').then(res => {
      if (res) {
        this.setState({
          isConfirmPublish: res.isConfirm
        }, () => {
          Taro.navigateTo({
            url: this.state.isConfirmPublish ? `/pages/publish/index?companyName=${res.company}` : '/pages/my_auth/index',
          });
        });
      }
    });

  }

  updateList = async () => {
    console.log('触发了下拉刷新。。。')
    if (this.state.loading) return
    this.setState({
      loading: true,
      currPageNum: 1,
      total: 0,
    })
    Taro.showLoading({
      title: '加载中'
    })
    // 重新刷新数据
    await this.fetchJobListHandle()
  }

  appendNextPageList = () => {
    console.log('触发了上拉加载。。。')
    if (this.state.loading) return
    Taro.showLoading({
      title: '加载中'
    })
    this.setState({
      loading: true,
      currPageNum: this.state.currPageNum + 1
    }, async () => {
      await this.fetchJobListHandle()
    })
    // setTimeout(() => {
    //   let jobData = Array.from({ length: 10 }, () => {
    //     return serverData[Math.floor(Math.random() * 7)]
    //   });
    //   this.setState({
    //     jobs_list: this.state.jobs_list.concat(jobData),
    //     loading: false
    //   });
    //   Taro.hideLoading()
    // }, 1000);
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
      // 用户数据入库
      Taro.login({
        success: loginRes => {
          Taro.request({
            url: `${rootUrl}/user/login`,
            data: {
              code: loginRes.code,
              encryptedData,
              iv,
              userInfo,
            },
            success: (res) => {
              // TODO: 未被正确执行
              console.log('hahah -- code', loginRes.code)
              console.log('成功了 --', res, res.data)
              const { data } = res;
              // TODO: 存在一个与此问题类似的情况 https://developers.weixin.qq.com/community/develop/doc/82ca869278af0322c43063a475660921?_at=1575951158725
              if (data.Token) {
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
              } else {
                console.log('授权失败');
                Taro.showModal({
                  title: '授权失败',
                  content: '请重新登录'
                });
              }

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
    const { active, isInitShow, banner } = this.state;
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
              {/* <Image className='banner_img' src={testImg} /> */}
              <MySwiper banner={banner}
              />
            </View>

            {/* 模块岗位划分 */}
            <View className='opts_jobs_list'>
              {
                OPTS_JOB.map(optsJob => (
                  <View className={`opts_job_item ${active === optsJob.lang ? 'actived' : ''}`} key={optsJob.lang}
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
                this.state.jobs_list.length && this.state.jobs_list.map(job_item => (
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
