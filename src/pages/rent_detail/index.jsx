import Taro, { Component } from '@tarojs/taro';
import { View, Map, Text, Button, Image } from '@tarojs/components';
import { AtSlider } from 'taro-ui'

import "taro-ui/dist/style/components/slider.scss";
import './index.less';
import { fetchRentDetail } from '../../client';
import { rootUrl } from '../../config';
import { transLangToName } from '../../utils/common';
import { OPTS_CITY } from '../../constants';

class Home extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      longitude: '',
      latitude: '',
      scaleRate: 14,
      rent_desc: '',
      rent_price: '',
      phoneNumber: '',
      rent_imgList: [],
      rent_city: '',
      rent_canShortRent: false,
      userInfo: {}
    }
  }
  async componentDidMount() {
    const { rent_id } = this.$router.params;
    let res = await fetchRentDetail({
      rent_id
    })
    console.log('=== 获取租房信息返回接口 ===', res)
    const {
      rent_imgList = [],
      latitude,
      longitude,
      rent_city,
      rent_desc,
      rent_price,
      rent_canShortRent,
      userInfo = {},
      rent_tel
    } = res;
    this.setState({
      latitude,
      longitude,
      rent_imgList,
      rent_city,
      rent_desc,
      rent_price,
      rent_canShortRent,
      userInfo,
      phoneNumber: rent_tel
    })
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
    console.log('=== 即将拨打电话 ===', this.state.phoneNumber);
    Taro.makePhoneCall({
      phoneNumber: this.state.phoneNumber
    });
  }

  render() {
    const { longitude, latitude, rent_city, scaleRate, rent_desc, rent_price, rent_imgList, userInfo = {} } = this.state;
    const { avatar, nickName, gender, company } = userInfo;
    return (
      <View className='rent_detail'>
        <View className='rent_map_address'>
          {transLangToName(OPTS_CITY, rent_city)}
        </View>
        <View className='rent_map_container'>
          <Map
            className='rent_map'
            id='container'
            longitude={longitude}
            latitude={latitude}
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
          <Image className='avatar' src={avatar} />
          <View className='info_user'>
            <Text className='info_name'>{nickName}</Text>
            <Text className='info_gender'>{company} {gender}</Text>
          </View>
          <Button className='contact' onClick={this.handleContactClick.bind(this)}>联系{gender == '男' ? '他' : '她'}</Button>
        </View>

        <View className='rent_detail_imgs'>
          {
            rent_imgList.map((rent_img, idx) => (
              <Image
                key={idx}
                className='rent_detail_img'
                src={`${rootUrl}${rent_img}`}
              />
            ))
          }
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