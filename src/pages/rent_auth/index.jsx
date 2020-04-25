import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import './index.less'

class RentAuth extends Component {

  config = {
    navigationBarTitleText: '发布·友享社区'
  }

  handleChangeRoute(path) {
    Taro.navigateTo({
      url: `/pages/rent_publish/index?origin=${path}`
    })
  }

  render() {
    return (
      <View className='rent_auth'>
        <View className='rent_auth_info findFriend' onClick={this.handleChangeRoute.bind(this, 'findFriend')}>
          <Text className='txt'>有房找室友</Text>
        </View>

        <View className='rent_auth_info findHouse' onClick={this.handleChangeRoute.bind(this, 'findHouse')}>
          <Text className='txt'>无房找房源</Text>
        </View>
      </View>
    )
  }
}

export default RentAuth;