import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, RichText } from '@tarojs/components';

import './index.less'

class PinsItem extends Component {

  static defaultProps = {
    nickName: '王维嘉',
    companyName: '京东',
    job: '推荐策略',
    contents: '20届补招内推',
    imgUrl: 'https://wx.qlogo.cn/mmopen/vi_32/KXQhCGAngYtWLZW3coRRS2z1mLdRBjkcZtlunqIsaKVMGveSlD8UO7R5COFq1RFN4fU8Nj5tVQuwXOoEjMdvLQ/132',
  }

  render() {
    const { nickName, companyName, job, contents, imgUrl } = this.props;
    return (
      <View className='pins_item'>
        <View className='pins_item_header'>
          <Image className='pins_item_header_avatar' src={imgUrl} />
          <View className='pins_item_header_info'>
            <View className='pins_item_header_info_title'>
              <Text className='name'>{nickName}</Text>
              <Text className='icon'>···</Text>
            </View>
            <View className='pins_item_header_info_desc'>
              <View className='jobs'>
                <Text className=''>{companyName}</Text>
                <Text className='bold'> · </Text>
                <Text className=''>{job}</Text>
              </View>
              {/* 当天就显示具体时间，非当日显示月日 */}
              <Text className='time'>02:32</Text>
            </View>
          </View>
        </View>

        <View className='pins_item_content'>
          <View className='pins_item_info'>
            <RichText nodes={contents} />
          </View>
          {/* <Image /> */}
        </View>

        <View className='pins_item_footer'>
          <View className='pins_item_item like'>
            <Text>0</Text>
          </View>
          <View className='pins_item_item comment'>
            <Text>0</Text>
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