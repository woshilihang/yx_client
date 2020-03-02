import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.less'

class MyLoading extends Component {

  render() {
    return this.props.visible ? (
      <View className='loading'>
        <View className='loading_mask'></View>
        <View className='loading_container'>
          Loading
        </View>
      </View>
    ): (<View></View>)
  }
}

export default MyLoading;