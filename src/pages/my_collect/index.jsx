import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.less'

class MyCollect extends Component {

  config = {
    navigationBarTitleText: '我的收藏'
  }

  render() {
    return (
      <View className='my_collect'>
        
      </View>
    )
  }
}

export default MyCollect;