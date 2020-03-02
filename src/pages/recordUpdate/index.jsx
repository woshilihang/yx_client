import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

class RecordUpdate extends Component {

  config = {
    navigationBarTitleText: '小公社'
  }

  render() {
    return (
      <View className='my'>
        RecordUpdate
      </View>
    )
  }
}

export default RecordUpdate;