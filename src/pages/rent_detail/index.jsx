import Taro, { Component } from '@tarojs/taro';
import { View, Map } from '@tarojs/components';


class Home extends Component {
  constructor() {
    super(...arguments)
    this.state = {
    }
  }
  componentDidMount() {
  }
  
  config = {
    navigationBarTitleText: '小公社'
  }
  
  render() {
    return (
      <View className='my'>
        <View onClick={this.handleBigMap}>大</View>
        <View onClick={this.handleSmallMap}>小</View>
        <Map onClick={this.onTap}
          markers='true'
          scale={this.state.rate}
        />
      </View>
    )
  }
}

export default Home;