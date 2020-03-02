import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';

import './index.less'

class Home extends Component {

  config = {
    navigationBarTitleText: '小公社'
  }

  render() {
    return (
      <View className='home'>
        <View className='home_preview' onClick={
          () => {
            Taro.navigateTo({
              url: '/pages/resume/index'
            })
          }
        }
        >
          <Image className='home_preview_img' />
          <View className='home_preview_content'>
            <Text className='home_preview_content_txt'>
              592 简历
            </Text>
            <Text className='home_preview_content_txt'>
              6780 评论
            </Text>
          </View>
        </View>

        <View className='home_preview' onClick={
          () => {
            Taro.navigateTo({
              url: '/pages/offer/index'
            })
          }
        }
        >
          <Image className='home_preview_img' />
          <View className='home_preview_content'>
            <Text className='home_preview_content_txt'>
              565 职言
            </Text>
            <Text className='home_preview_content_txt'>
              4095 点赞
            </Text>
          </View>
        </View>

        <View className='home_preview' onClick={
          () => {
            Taro.navigateTo({
              url: '/pages/rent/index'
            })
          }
        }
        >
          <Image className='home_preview_img' />
          <View className='home_preview_content'>
            <Text className='home_preview_content_txt'>
              3176 出租
            </Text>
            <Text className='home_preview_content_txt'>
              32 求租
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

export default Home;