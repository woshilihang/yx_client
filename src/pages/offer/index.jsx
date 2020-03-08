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
        <View className='resumt_content'>
          content
        </View>
        <View className='resumt_footer'>
          footer
        </View>
      </View>
    )
  }
}

export default Offer;