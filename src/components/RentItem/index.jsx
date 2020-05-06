import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import './index.less';
import testImg from '../../public/images/test.jpeg'
import { rootUrl } from '../../config';

class RentItem extends Component {

  constructor() {
    super(...arguments);
    this.state = {}
  }


  render() {
    const { _id: rent_id = '', rent_imgList=[], rent_price = '￥4000', rent_type = '求室友', userInfo = {}, onGo, rent_desc='珠江四季悦城大三居，业主新收房，一次没住过，可办公，可添加新家具，卧式采光好，储存空间大' } = this.props;
    const { nickName, company = '京东', job_type = '业务', avatar = testImg } = userInfo;
    return (
      <View className='rent_item' onClick={() => onGo(rent_id)}>
        <View className='rent_item_wrapper'>
          <Image className='rent_item_wrapper_img' src={`${rootUrl}${rent_imgList[0]}`} />

          <View className='rent_item_wrapper_content'>
            <View className='rent_item_header'>
              <Image className='rent_item_avatar' src={avatar} />
              <View className='rent_item_wrapper_info'>
                <View className='rent_item_wrapper_info_title'>
                  <Text className='name'>{nickName}</Text>
                  <Text className='icon'>···</Text>
                </View>
                <View className='rent_item_wrapper_info_desc'>
                  <View className='jobs'>
                    <Text className=''>{company}</Text>
                    <Text className='bold'> · </Text>
                    <Text className=''>{job_type}</Text>
                  </View>
                  {/* 当天就显示具体时间，非当日显示月日 */}
                  <Text className='time'>02:32</Text>
                </View>
              </View>
            </View>

            <View className='rent_item_tips'>
              <Text className='price'>{rent_price}</Text>
              <Text className='rent_type'>
                {rent_type}
              </Text>
            </View>

            <View className='rent_item_desc'>{rent_desc.slice(0, 33)}...</View>
          </View>
        </View>
      </View>
    )
  }
}

export default RentItem;