import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

class MyPublish extends Component {

  config = {
    navigationBarTitleText: '我发布的'
  }

  render() {
    return (
      <View className='my_publish'>
        我的发布
      </View>
    )
  }
}

export default MyPublish;