import Taro, { Component } from '@tarojs/taro';
import { View, Map, Text, Button, Image } from '@tarojs/components';
import { AtSlider } from 'taro-ui'

import "taro-ui/dist/style/components/slider.scss";
import './index.less';

class Home extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      longitude: '',
      latitude: '',
      scaleRate: 14,
      rent_desc: '转租，可以月付，可以短租，合同到期可续签, 转租，可以月付，可以短租，合同到期可续签,转租，可以月付，可以短租，合同到期可续签',
      rent_price: '2000',
      phoneNumber: '18296542194'
    }
  }
  componentDidMount() {
  }

  config = {
    navigationBarTitleText: '小公社'
  }

  handleChangeSlideScale(val) {
    this.setState({
      scaleRate: val
    });
  }

  handleContactClick() {
    Taro.makePhoneCall({
      phoneNumber: this.state.phoneNumber
    });
  }

  render() {
    const { longitude, latitude, address = '北京', scaleRate, rent_desc, rent_price } = this.state;
    return (
      <View className='rent_detail'>
        <View className='rent_map_address'>
          {address}
        </View>
        <View className='rent_map_container'>
          <Map
            className='rent_map'
            id='container'
            // longitude={longitude}
            // latitude={latitude}
            showLocation
            showCompass
            showScale
            scale={scaleRate}
            includePoints
            includePadding
          />
        </View>
        <View className='rent_map_slider'>
          <AtSlider
            min={3} max={20}
            backgroundColor='#333'
            activeColor='#333'
            value={scaleRate}
            onChange={this.handleChangeSlideScale.bind(this)}
            blockColor='#333' blockSize={22}
          ></AtSlider>
        </View>

        <View className='rent_detail_review'>
          <View className='content'>
            {rent_desc}
          </View>
          <View className='info'>
            <Text className='price'>￥{rent_price}/月</Text>
            <Text className='extra'>为早日找到室友，可私聊我免一些房租</Text>
          </View>
        </View>

        <View className='rent_detail_review flex'>
          <Image className='avatar' src='http://t7.baidu.com/it/u=3616242789,1098670747&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1588419768&t=75098bd0bc3df7fa6e00ac8531dd7d40' />
          <View className='info_user'>
            <Text className='info_name'>Echo</Text>
            <Text className='info_gender'>女生</Text>
          </View>
          <Button className='contact' onClick={this.handleContactClick.bind(this)}>联系TA{}</Button>
        </View>

        <View className='rent_detail_imgs'>
          <Image className='rent_detail_img' src='http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1588419768&t=4db1f6e2af62e8c8feb5a80d5b5bab9b' />
          <Image className='rent_detail_img' src='http://t7.baidu.com/it/u=3225540498,2642373837&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1588419768&t=238f3a659aae6694d22526b9cb827c6f' />
        </View>

        <View className='rent_detail_footer'>
          <View className='rent_detail_footer_item collect'>
            收藏
          </View>
          <View className='rent_detail_footer_item posts'>
            生成详情海报
          </View>
        </View>
      </View>
    )
  }
}

export default Home;