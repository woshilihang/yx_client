import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

class History extends Component {

  config = {
    navigationBarTitleText: '我的足迹'
  }

  render() {
    return (
      <View className='history'>
        足迹
      </View>
    )
  }
}

export default History;