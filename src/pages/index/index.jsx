/* eslint-disable import/first */
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Image, Button, ScrollView } from '@tarojs/components'
import { AtActivityIndicator, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { initAppAuth } from '../../actions/init'
import AuthModal from '../../components/Modal';
import pageInit from '../../components/pageInit';

import 'taro-ui/dist/style/components/activity-indicator.scss'
import 'taro-ui/dist/style/components/loading.scss';
import "taro-ui/dist/style/components/action-sheet.scss";

import './index.less'

import msgIcon from '../../public/images/msg.png'
// import testImg from '../../public/images/test.jpeg'


import JDItem from '../../components/JDItem/index'
// import MyLoading from '../../components/Loading/index'
import http from '../../utils/http';
import { OPTS_JOB, OPTS_CITY } from '../../constants';
import { fetchJobList } from '../../client';
import { rootUrl } from '../../config';
import MySwiper from '../../components/MySwiper';
import { transLangToName } from '../../utils/common'

const defaultConfig = {
  search_txt: '搜索职位或公司名称',
}

const mapState = ({ init }) => ({
  hasInit: init.hasInit
});

const pageNum = 8; // 每页多少条数据

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
    isFinished: false, // 内推职位信息分页数据加载完成
    isOpened: false,
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
    ],

    // 下拉刷新相关
    dargStyle: {//下拉框的样式
      top: 0 + 'px'
    },
    downDragStyle: {//下拉图标的样式
      height: 0 + 'px'
    },
    downText: '下拉刷新',
    upDragStyle: {//上拉图标样式
      height: 0 + 'px'
    },
    pullText: '上拉加载更多',
    start_p: {},
    scrollY: true,
    dargState: 0, //刷新状态 0不做操作 1刷新 -1加载更多
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  async componentDidShow() {
    console.log('loading -- ', this.state.loading);
    console.log(this.props.init);

    Taro.showLoading({
      title: '加载中...'
    })
    await this.fetchJobListHandle()
  }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '友享社区',
  }
  //分享
  onShareAppMessage() {
    return {
      title: '友享社区，解决你的校园&职前问题！！'
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

  handleConfirmInput = (evt) => {
    console.log(evt, '---')
    // const val = evt.detail.value;
    // TODO: 关键字搜索
    this.setState({
      loading: true,
      currPageNum: 1,
      isFinished: false,
    }, async () => {
      await this.fetchJobListHandle()
    });
  }

  fetchJobListHandle = async () => {
    const { active, currPageNum, search_val = '' } = this.state;
    let city = Taro.getStorageSync('curr_city');
    // /job/list?job_type=${active}&nextPageNum=${currPageNum}&keyword=${search_val}
    let res = await fetchJobList({
      job_type: active,
      nextPageNum: currPageNum,
      keyword: search_val,
      city
    });
    const { list, total, currentNum } = res;
    Taro.hideLoading();
    this.setState({
      loading: false,
      jobs_list: currPageNum > 1 ? this.state.jobs_list.concat(list) : list,
      jobTotalNum: total,
      currPageNum: currentNum,
      isFinished: list.length >= pageNum ? false : true
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
      isFinished: false,
    }, async () => {
      await this.fetchJobListHandle()
    });
  }

  handleChangeCityClick = () => {
    this.setState({
      isOpened: true
    })
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

  updateList = () => {
    console.log('触发了下拉刷新。。。')
    if (this.state.loading) return
    Taro.showLoading({
      title: '加载中'
    })
    this.setState({
      loading: true,
      currPageNum: 1,
      total: 0,
      isFinished: false,
      jobs_list: [],
    }, async () => {
      // 重新刷新数据
      await this.fetchJobListHandle()
    })
  }

  appendNextPageList = () => {
    console.log('触发了上拉加载。。。', this.state.loading, this.state.isFinished)
    if (this.state.loading || this.state.isFinished) return
    Taro.showLoading({
      title: '加载中'
    })
    this.setState({
      loading: true,
      currPageNum: Number(this.state.currPageNum) + 1
    }, async () => {
      await this.fetchJobListHandle()
    })
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

  down() {//下拉
    console.log('下拉')
    this.updateList()
  }

  touchStart(evt) {
    this.setState({
      start_p: evt.touches[0]
    })
  }
  touchEnd() {
    if (this.state.dargState === 1) {
      this.down()
    } else if (this.state.dargState === -1) {
      // 上拉加载操作
      // this.pull()
    }
    this.reduction()
  }

  pull() {
    console.log('上拉')
    this.appendNextPageList()
  }

  reduction() {//还原初始设置
    const time = 0.5;
    this.setState({
      upDragStyle: {//上拉图标样式
        height: 0 + 'px',
        transition: `all ${time}s`
      },
      dargState: 0,
      dargStyle: {
        top: 0 + 'px',
        transition: `all ${time}s`
      },
      downDragStyle: {
        height: 0 + 'px',
        transition: `all ${time}s`
      },
      scrollY: true
    })
    setTimeout(() => {
      this.setState({
        dargStyle: {
          top: 0 + 'px',
        },
        upDragStyle: {//上拉图标样式
          height: 0 + 'px'
        },
        pullText: '上拉加载更多',
        downText: '下拉刷新'
      })
    }, time * 1000);
  }

  touchmove(e) {
    let move_p = e.touches[0],//移动时的位置
      deviationX = 0.30,//左右偏移量(超过这个偏移量不执行下拉操作)
      deviationY = 70,//拉动长度（低于这个值的时候不执行）
      maxY = 100;//拉动的最大高度

    let start_x = this.state.start_p.clientX,
      start_y = this.state.start_p.clientY,
      move_x = move_p.clientX,
      move_y = move_p.clientY;


    //得到偏移数值
    let dev = Math.abs(move_x - start_x) / Math.abs(move_y - start_y);
    if (dev < deviationX) {//当偏移数值大于设置的偏移数值时则不执行操作
      let pY = Math.abs(move_y - start_y) / 3.5;//拖动倍率（使拖动的时候有粘滞的感觉--试了很多次 这个倍率刚好）
      if (move_y - start_y > 0) {//下拉操作
        if (pY >= deviationY) {
          this.setState({ dargState: 1, downText: '释放刷新' })
        } else {
          this.setState({ dargState: 0, downText: '下拉刷新' })
        }
        if (pY >= maxY) {
          pY = maxY
        }
        this.setState({
          dargStyle: {
            top: pY + 'px',
          },
          downDragStyle: {
            height: pY + 'px'
          },
          scrollY: false//拖动的时候禁用
        })
      }
      if (start_y - move_y > 0) {//上拉操作
        console.log('上拉操作')
        if (pY >= deviationY) {
          this.setState({ dargState: -1, pullText: '释放加载更多' })
        } else {
          this.setState({ dargState: 0, pullText: '上拉加载更多' })
        }
        if (pY >= maxY) {
          pY = maxY
        }
        this.setState({
          dargStyle: {
            top: -pY + 'px',
          },
          upDragStyle: {
            height: pY + 'px'
          },
          scrollY: false//拖动的时候禁用
        })
      }

    }
  }

  handleCancel = () => {
    this.setState({
      isOpened: false
    })
  }

  handleAtActionSheetClick = (city) => {
    Taro.setStorageSync('curr_city', city)
    this.setState({
      loading: true,
      currPageNum: 1,
      isFinished: false,
      isOpened: false
    }, async () => {
      await this.fetchJobListHandle()
    });
  }

  render() {
    const { active, isInitShow, banner, isFinished, isOpened } = this.state;
    let dargStyle = this.state.dargStyle;
    let downDragStyle = this.state.downDragStyle;
    // let upDragStyle = this.state.upDragStyle;
    return (
      <View className='index'>
        {
          (isInitShow && !this.props.hasInit) && (<AuthModal
            title='授权提示'
            contentText='Taro社区邀您完成授权，尊享时尚奢华之旅'
            onCancelCallback={this.hideAuthModal}
            onConfirmCallback={this.prcoessAuthResult}
            isAuth='true'
          />)
        }
        <View className='downDragBox' style={downDragStyle}>
          <AtActivityIndicator size={32} color='#333'></AtActivityIndicator>
          <Text className='downText'>{this.state.downText}</Text>
        </View>
        <AtActionSheet className='self_atactionsheet' isOpened={isOpened}
          cancelText='取消'
          onCancel={this.handleCancel}
        >
          {
            OPTS_CITY.map(city => (
              <AtActionSheetItem onClick={this.handleAtActionSheetClick.bind(this, city.lang)} key={city.id}>
                {city.name}
              </AtActionSheetItem>
            ))
          }
        </AtActionSheet>
        <ScrollView
          className='jd_lists dragUpdata'
          scrollY
          scrollWithAnimation
          scrollTop='0'
          // upperThreshold='10'
          // onScrolltoupper={this.updateList}
          lowerThreshold='40'
          onScrolltolower={this.appendNextPageList}
          style={{
            ...dargStyle,
            height: '100vh',
          }}
          onTouchStart={this.touchStart.bind(this)}
          onTouchMove={this.touchmove.bind(this)}
          onTouchEnd={this.touchEnd.bind(this)}
        >
          <View className='content'>
            {/* <MyLoading visible={this.state.loading} /> */}
            <View className='header'>
              <View className='header_address'>
                <Text onClick={this.handleChangeCityClick}>{
                  transLangToName(OPTS_CITY, Taro.getStorageSync('curr_city')) || '全国'
                }</Text>
              </View>
              <View className='header_search'>
                <Input
                  focus
                  placeholderClass='header_search_input-placeholder'
                  className='header_search_input' confirm-type='search'
                  onInput={this.handleSearchInput}
                  onConfirm={this.handleConfirmInput}
                  placeholder={defaultConfig.search_txt}
                  value={this.state.search_val}
                />
              </View>
              <Image className='header_msg' src={msgIcon} />
            </View>

            {/* banner广告区域 */}
            <View className='banner'>
              {/* <Image className='banner_img' src={testImg} /> */}
              <MySwiper banner={banner} />
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

            {/* 没有更多了 */}
            {
              isFinished && <View className='no_data'>
                <Text className='no_data_txt'>没有更多了...</Text>
              </View>
            }

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
        {/* <View className='upDragBox' style={upDragStyle}>
          <AtActivityIndicator size={32} color='#333'></AtActivityIndicator>
          <Text className='downText'>{this.state.downText}</Text>
        </View> */}
      </View>
    )
  }
}

export default Index
