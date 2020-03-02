import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.less'

class Offer extends Component {

  config = {
    navigationBarTitleText: '求offer'
  }

  render() {
    return (
      <View className='resume'>
        求offer
      </View>
    )
  }
}

export default Offer;