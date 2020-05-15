import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, RichText } from '@tarojs/components';
import { replaceSpaceToBr } from '../../utils/common';

import './index.less'
import { rootUrl } from '../../config';
import { fetchPinsPrize } from '../../client';

class PinsItem extends Component {

  static defaultProps = {
    nickName: '',
    companyName: '',
    job: '',
    pins_desc: '',
    pins_prize_num: [],
    pins_comment: 0,
    pins_imgList: [],
    userInfo: {},
    onGo: () => void 0,
    pins_prize_self: false, // 用户是否已经点赞了该评论
  }

  getDomInfoStr = (desc, info) => {
    const imgStr = info.map(img => {
      return `<img src='${rootUrl}${img}' style='width: 33vw;margin-right: 5vw;
      height: 33vw;' />`;
    }).join('');
    let desc_info = replaceSpaceToBr(desc) + '<Br />';
    return '<p style="margin: 0px 0 16px;">' + desc_info + '</p>' + imgStr;
  }

  async handlePrizeCLick(evt) {
    console.log('evt ---', evt)
    evt.stopPropagation()
    // TODO: 触发点赞请求 /pins/prize
    console.log('沸点详情页 路由信息 this.$router', this.$router, this.props);
    const { pins_id, _id, origin } = this.props;
    let hasPrize;
    if(origin === 'pins') {
      let res= await fetchPinsPrize({ pins_id: _id });
      hasPrize = res.hasPrize
      this.props.onReFetchData(_id, res.pins_prize_num)
    } else if(origin === 'pins_detail') {
      let res= await fetchPinsPrize({ pins_id: pins_id });
      hasPrize = res.hasPrize
      this.props.onReFetchData(pins_id, res.pins_prize_num)
    }
    Taro.showToast({
      title: `${hasPrize ? '已点赞' : '已取消'}`,
      icon: 'success'
    });
  }

  render() {
    const { _id: pins_id = '', pins_desc = '', pins_comment, pins_prize_num, pins_imgList, userInfo, onGo, pins_prize_self = false, replyList = [] } = this.props;
    const { nickName, company, job_type, avatar } = userInfo;
    console.log(this.props, 'this.props')
    let str = this.getDomInfoStr(pins_desc, pins_imgList);
    return (
      <View className='pins_item' onClick={(evt) => onGo(evt, pins_id)}>
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
          <View className={`pins_item_item like ${pins_prize_self ? 'like_ed' : ''}`} onClick={this.handlePrizeCLick.bind(this)}>
            <Text>{pins_prize_num}</Text>
          </View>
          <View className='pins_item_item comment' onClick={(evt) => this.props.onChangeTargetComment(evt, true, pins_id)}>
            <Text>{replyList.length}</Text>
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