import Taro, { Component } from '@tarojs/taro';
import { View, Map } from '@tarojs/components';

import Modal from '../../components/Modal/index'

class Home extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      rate: 16.0,
      showAuthModal: false
    }
    this.$app = this.$app || {}
  }
  componentDidMount() {
    const isHomeLongHideAuthModal = Taro.getStorageSync('isHomeLongHideAuthModal')
    console.log(isHomeLongHideAuthModal)
    if(isHomeLongHideAuthModal) return
    this.setState({
      showAuthModal: true
    });

    Taro.login({
      success: function(loginRes) {
          if (loginRes.code) {
              // example: 081LXytJ1Xq1Y40sg3uJ1FWntJ1LXyth
              console.log(loginRes)
          }
      }
  });
  }
  onTap = () => {
    console.log('onTap')
  }
  handleBigMap = () => {
    this.setState({
      rate: this.state.rate + 2
    })
  }
  handleSmallMap = () => {
    this.setState({
      rate: this.state.rate - 2
    })
  }

  hideAuthModal = () => {
    Taro.setStorageSync('isHomeLongHideAuthModal', true)
    this.setState({
      showAuthModal: false
    })
  }

  prcoessAuthResult = (userData) => {
    Taro.setStorageSync('isHomeLongHideAuthModal', true)
    if(userData.userInfo) {
      this.$app.userData = userData
    }
    this.setState({
      showAuthModal: false
    })
  }

  config = {
    navigationBarTitleText: '小公社'
  }
  
  render() {
    return (
      <View className='my'>
        {
          true && (
            <Modal
              title='授权提示'
              contentText='Taro电商邀您完成授权，尊享时尚奢华之旅'
              onCancelCallback={this.hideAuthModal}
              onConfirmCallback={this.prcoessAuthResult}
              isAuth='true'
            />
          )
        }
        <View onClick={this.handleBigMap}>大</View>
        <View onClick={this.handleSmallMap}>小</View>
        <Map onClick={this.onTap}
          markers='true'
          scale={this.state.rate}
        />
      </View>
    )
  }
}

export default Home;