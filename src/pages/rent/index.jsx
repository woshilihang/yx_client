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
		return{
			title : 'this page shareMessage'
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