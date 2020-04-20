import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.less'
import pageInit from '../../components/pageInit';

@pageInit()
class Rent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canShare: false
    }
  }

  config = {
    navigationBarTitleText: '租房公社'
  }

  //分享
	onShareAppMessage(){
		return {
			title : '友享社区，解决你的校园&职前问题！！'
		}
	}

  render() {
    return (
      <View className='rent'>
        租房公社
      </View>
    )
  }
  
}

export default Rent;