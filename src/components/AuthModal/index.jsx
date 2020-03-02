/* eslint-disable react/no-multi-comp */
import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

import './index.less';

const Dialog = ({ title, content, footer }) => {

  return (
    <View className='auth_modal'>
      {/* 遮罩层 */}
      <View className='auth_modal-mask'></View>
      {/* 弹窗主体内容 */}
      <View className='auth_modal-title'>
        {title}
      </View>
      <View className='auth_modal-content'>
        {content}
      </View>
      <View className='auth_modal-footer'>
        {footer}
      </View>
    </View>
  )
}

class AuthModalCom extends Component {

  static defaultProps = {
    isVisible: true
  }

  constructor() {
    super(...arguments);
    this.state = {

    }
  }

  renderTitle = () => (
    <View className='auth_modal_title-name'>
      <Image src=''></Image>
      <View className='title'>友享社区</View>
      <View className='txt'>申请</View>
    </View>
  )

  renderChildren = () => (
    <>
      <View classNam='auth_modal_content-info'>获取你的位置信息</View>
      <View className='auth_modal_content-desc'>获取你的姓名，性别等相关信息</View>
    </>
  )

  render() {
    const { isVisible } = this.props;
    return isVisible && (
      <>
        <Dialog
          title={this.renderTitle()}
          content={this.renderChildren()}
        />
      </>
    )
  }
}


export default AuthModalCom;