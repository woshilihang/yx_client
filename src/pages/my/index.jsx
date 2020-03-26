import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import './index.less'

import publish from '../../public/images/my/publish.png'
import copy from '../../public/images/my/copy.png'
import collect from '../../public/images/my/collect.png'
import footerprint from '../../public/images/my/footerprint.png'
import message from '../../public/images/my/message.png'

class My extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      oper_list: [
        {
          id: 1,
          text: '发布',
          iconPath: publish,
          gotoUrl: `/pages/my_publish/index`
        },
        {
          id: 2,
          text: '已复制',
          iconPath: copy,
          gotoUrl: `/pages/my_copy/index`
        },
        {
          id: 3,
          text: '收藏',
          iconPath: collect,
        },
        {
          id: 4,
          text: '足迹',
          iconPath: footerprint,
        },
        {
          id: 5,
          text: '消息',
          iconPath: message,
        }
      ],
      feedback_list: [
        {
          id: 1,
          text: '更新记录',
          goUrl: '',
        },
        {
          id: 2,
          text: '联系客服',
          goUrl: '',
        },
        {
          id: 1,
          text: '意见反馈',
          goUrl: '',
        }
      ],
      userInfo: {}
    }
  }

  componentDidMount() {
    // TODO: 或者从redux里面取出数据
    const userInfo = Taro.getStorageSync('userInfo') || {};
    if (Object.keys(userInfo).length) {
      this.setState({
        userInfo
      })
    }
  }

  config = {
    navigationBarTitleText: '个人中心'
  }

  handleOperClick = (url) => {
    if (!url) return;
    Taro.navigateTo({
      url
    })
  }


  render() {
    const { userInfo } = this.state;
    return (
      <View className='my'>
        <View className='header'>
          {/* TODO: 增加一个垫底图片 */}
          <Image className='header_img' src={userInfo.avatarUrl} />
          <View className='header_content'>
            <View className='header_content-nickname'>
              {userInfo.nickName || '请登录'}<Text className='icon'></Text>
            </View>
            {
              (userInfo.province || userInfo.city) && (
                <View className='header_content-school'>
                  {`${userInfo.province} - ${userInfo.city}`}
                </View>
              )
            }
            <View className='header_content-edit'>
              编辑个人资料
              <Text> &gt; </Text>
            </View>
          </View>
        </View>

        {/* 与我相关功能区域start */}
        <View className='oper_list'>
          {
            this.state.oper_list.map(oper => (
              <View className='oper_item' key={oper.id}
                onClick={oper.gotoUrl ? this.handleOperClick.bind(this, oper.gotoUrl) : () => { }}
              >
                <Image className='oper_icon' src={oper.iconPath} />
                <Text className='oper_txt'>
                  {oper.text}
                </Text>
              </View>
            ))
          }
        </View>

        {/* 反馈相关功能 */}
        <View className='feedback_list'>
          {
            this.state.feedback_list.map(feedback_item => (
              <View className='feedback_item' key={feedback_item.id}>
                <Text className='feedback_item_txt'>
                  {feedback_item.text}
                </Text>
                <Text className='feedback_item_icon'>
                  {/* &gt; */}
                </Text>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}

export default My;