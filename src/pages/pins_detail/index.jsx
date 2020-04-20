import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import PinsItem from '../../components/pinsItem/index';
import Comment from '../../components/Comment/index';
import Reply from '../../components/Reply/index';

import './index.less'
import { fetchPinsDetail } from '../../client';

class PinsDetail extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      detailInfo: {},
      commentList: []
    }
  }

  async componentDidMount() {
    await this.fetchPinsDetailData()
  }

  fetchPinsDetailData = async () => {
    const { pins_id } = this.$router.params;
    const res = await fetchPinsDetail({
      pins_id
    });
    console.log('沸点详情接口返回res ---', res)
    this.setState({
      detailInfo: res
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
          <PinsItem {...detailInfo} onReFetchData={this.fetchPinsDetailData}
            origin='pins_detail'
          />
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