import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.less'

class Resume extends Component {

  config = {
    navigationBarTitleText: '互修简历'
  }

  render() {
    return (
      <View className='resume'>
        互修简历
      </View>
    )
  }
}

export default Resume;