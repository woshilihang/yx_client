import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.less';

class MyMsg extends Component {

  config = {
    navigationBarTitleText: '我的消息'
  }

  render() {
    return (
      <View className='my_msg'>
        我的消息
      </View>
    )
  }
}

export default MyMsg;