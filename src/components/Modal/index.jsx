import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components';

import './index.less'

class Modal extends Component {

  static defaultProps = {
    title: '',
    isAuth: false,
    contentText: '',
    cancelText: '取消',
    confirmText: '确定',
    onConfirmCallback: () => { },
    onCancelCallback: () => { },
  }

  handleCancleClick = () => {
    this.props.onCancelCallback()
  }

  handleConfirmClick = () => {
    this.props.onConfirmCallback()
  }

  authConfirmClick = (evt) => {
    // 把获取到用户的数据传递出去
    this.props.onConfirmCallback(evt.detail)
  }

  preventTouchMove = (evt) => {
    // 阻止在蒙层上面的手势
    evt.stopPropagation()
  }
  render() {
    const { cancelText, confirmText, title, isAuth, contentText } = this.props;
    return (
      <View className='auth_modal'>
        <View className='modal_mask'></View>
        <View className='modal' onTouchMove={this.preventTouchMove}>
          <View className='modal_title'>
            {title}
          </View>
          <View className='modal_content'>
            {contentText}
          </View>
          <View className='modal_btn_list'>
            <Button className='modal_btn modal_btn_cancel' onClick={this.handleCancleClick}>{cancelText}</Button>
            {
              !isAuth ? (
                <Button className='modal_btn modal_btn_confirm' onClick={this.handleConfirmClick}>{confirmText}</Button>
              ) : (
                  <Button className='modal_btn modal_btn_confirm' openType='getUserInfo' onGetUserInfo={this.authConfirmClick}>{confirmText}</Button>
                )
            }
          </View>
        </View>
      </View>
    )
  }
}

export default Modal