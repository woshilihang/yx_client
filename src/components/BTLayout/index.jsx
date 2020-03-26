import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
// import closeImg from '../../images/icons/close.png';

import './index.less';

class FloatLayout extends Component {

  state = {
  }

  handleClose() {
    this.props.onClose && this.props.onClose()
  }

  render() {
    const { isOpened, title, wrapperCls } = this.props
    return (
      <View className={`${isOpened ? "flolayout active" : "flolayout"} ${wrapperCls ? wrapperCls : ''}`} >
        <View className='flolayout__overlay' onClick={this.handleClose.bind(this)}></View>
        <View className='flolayout__container layout'>
          <View className='layout-header  xmg-border-b'>
            {title}
            {/* <Image src={closeImg} className='close-img' /> */}
          </View>
          <View className='layout-body'>
            {/* {this.props.children} */}
            1111
          </View>
        </View>
      </View>
    )
  }
}

export default FloatLayout;