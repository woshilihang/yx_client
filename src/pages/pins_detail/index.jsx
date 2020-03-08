import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import PinsItem from '../../components/pinsItem/index';
import Comment from '../../components/Comment/index';
import Reply from '../../components/Reply/index';

import { rootUrl } from '../../config/index';

import './index.less'

class PinsDetail extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      detailInfo: {},
      commentList: [{
        id: '1',
        pins_comment: '我是一条留言'
      }]
    }
  }

  componentDidMount() {
    const { pins_id = '5e61140103ea2446632d0977' } = this.$router.params;
    console.log('pins_id', pins_id);
    const url = `${rootUrl}/pins/detail?pins_id=${pins_id}`;
    console.log(url)
    Taro.request({
      url: `${rootUrl}/pins/detail?pins_id=${pins_id}`,
      method: 'GET',
      header: {
        authorization: 'Bearer ' + Taro.getStorageSync('TOKEN'),
      },
      success: res => {
        console.log(res, 'res')
        if (res.data && res.data.code === 200) {
          this.setState({
            detailInfo: res.data.data
          });
        }
      }
    })
  }

  config = {
    navigationBarTitleText: '沸点详情'
  }


  render() {
    const { detailInfo } = this.state;
    const { replyList = [] } = detailInfo;
    console.log(replyList);
    return (
      <View className='pins_detail'>
        <View className='pins_detail_wrapper'>
          <PinsItem {...detailInfo} />
          <View className='pins_detail_comments'>
            <View className='pins_detail_title'>
              留言 · {this.state.commentList.length}
            </View>
            <View className='pins_detail_comments_reply'>
              {
                replyList.map(reply_info => (
                  <Reply {...reply_info} key={reply_info._id} />
                ))
              }
            </View>
          </View>
        </View>
        <Comment />
      </View>
    )
  }
}

export default PinsDetail;