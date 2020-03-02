import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import AuthModal from '../../components/Modal';
import pageInit from '../../components/pageInit';


@pageInit()
class DEMO extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      isInitShow: true, // 初始化
      canShare: true
    }
  }

  componentDidMount() {
    const hasInit = Taro.getStorageSync('hasInit'); // 是否已经第一次进来初始化了
    if (hasInit) {
      Taro.switchTab({ url: '/pages/index/index' });
      return;
    }
    this.setState({
      isInitShow: !hasInit
    })
  }

  config = {
    navigationBarTitleText: '小公社'
  }

  //分享
  onShareAppMessage() {
    return {
      title: 'this page shareMessage'
    }
  }

  /**
   *  处理用户授权信息
   * @param userData 获取到的用户授权信息
   */
  prcoessAuthResult = (userData) => {
    let { userInfo } = userData;
    if (userInfo) {
      Taro.setStorageSync('userInfo', userInfo);
      Taro.setStorageSync('hasInit', true);
      Taro.switchTab({
        url: '/pages/index/index'
      });

      // 用户信息数据入库
      // Taro.login({ 
      //   success: loginRes => {
      //     Taro.request({
      //       url: 'http://localhost:5000/user/login',
      //       data: {
      //         code: loginRes.code,
      //         encryptedData: userData.encryptedData,
      //         iv: userData.iv,
      //         userInfo: userData.userInfo
      //       },
      //       success: (res) => {
      //         const { data } = res;
      //         Taro.showModal({
      //           title: '登录成功',
      //           content: data.message
      //         });
      //         Taro.setStorageSync('TOKEN', data.Token);
      //         console.log(userData, 'userRes')
      //         // Taro.$globalData.userInfo = userRes.userInfo;
      //         this.setState({
      //           userInfo: userData.userInfo,
      //           hasUseInfo: true
      //         })
      //       }
      //     })
      //   }
      // })

    }
  }

  hideAuthModal = () => {
    Taro.setStorageSync('hasInit', false);
    Taro.switchTab({
      url: '/pages/index/index'
    });
  }

  render() {
    const { isInitShow } = this.state;
    console.log('demo render')
    return (
      <View className='my'>
        {
          isInitShow && (<AuthModal
            title='授权提示'
            contentText='Taro社区邀您完成授权，尊享时尚奢华之旅'
            onCancelCallback={this.hideAuthModal}
            onConfirmCallback={this.prcoessAuthResult}
            isAuth='true'
          />)
        }
      </View>
    )
  }
}

export default DEMO;