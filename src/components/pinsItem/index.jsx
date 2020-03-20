import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, RichText } from '@tarojs/components';
import { replaceSpaceToBr } from '../../utils/common';

import './index.less'

class PinsItem extends Component {

  static defaultProps = {
    nickName: '王维嘉',
    companyName: '京东',
    job: '推荐策略',
    pins_desc: '',
    pins_prize: 0,
    pins_comment: 0,
    pins_imgList: [],
    userInfo: {},
    onGo: () => void 0,
  }

  // renderDomInfo = (info) => {
  //   let domInfo = info.map(img => (
  //     <Image src={img} className='pins_item_info_img' key={img} />
  //   ));
  //   console.log(domInfo);

  // }
  getDomInfoStr = (desc, info) => {
    const imgStr = info.map(img => {
      return `<img src="http://localhost:5000${img}" style='width: 200px;
      height: 250px;' />`;
    }).join('');
    let desc_info = replaceSpaceToBr(desc) + '<Br />';
    return '<p style="margin: 0px 0 16px;">' + desc_info + '</p>' + imgStr;
  }

  render() {
    const { _id: pins_id = '', pins_desc = '', pins_comment, pins_prize, pins_imgList, userInfo, onGo } = this.props;
    const { nickName, company, job_type, avatar } = userInfo;
    console.log(this.props, 'this.props')
    let str = this.getDomInfoStr(pins_desc, pins_imgList);
    return (
      <View className='pins_item' onClick={() => onGo(pins_id)}>
        <View className='pins_item_header'>
          <Image className='pins_item_header_avatar' src={avatar} />
          <View className='pins_item_header_info'>
            <View className='pins_item_header_info_title'>
              <Text className='name'>{nickName}</Text>
              <Text className='icon'>···</Text>
            </View>
            <View className='pins_item_header_info_desc'>
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

        <View className='pins_item_content'>
          <View className='pins_item_info'>
            {/* 设置图片宽度问题 */}
            <RichText nodes={str} />
          </View>
        </View>

        <View className='pins_item_footer'>
          <View className='pins_item_item like'>
            <Text>{pins_prize}</Text>
          </View>
          <View className='pins_item_item comment'>
            <Text>{pins_comment}</Text>
          </View>
          <View className='pins_item_item forward'>
            <Text>0</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default PinsItem;