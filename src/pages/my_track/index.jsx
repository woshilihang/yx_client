import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.less';

class MyTrack extends Component {

  config = {
    navigationBarTitleText: '我的足迹'
  }

  render() {
    return (
      <View className='my_track'>
        我的足迹
      </View>
    )
  }
}

export default MyTrack;