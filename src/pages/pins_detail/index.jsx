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
      commentList: [],
      reply_is_ordinary: true, // 是否为一级评论
      reply_to_id: ''
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

  async refresh() {
    await this.fetchPinsDetailData()
  }

  config = {
    navigationBarTitleText: '沸点详情'
  }

  changeTargetComment(evt, isFirstComment, _id) {
    console.log('changeTargetComment ===', evt, isFirstComment, _id)
    this.setState({
      reply_is_ordinary: isFirstComment,
      reply_to_id: _id
    })
  }

  render() {
    const { detailInfo, reply_to_id, reply_is_ordinary } = this.state;
    const { replyList = [] } = detailInfo;
    console.log(replyList);
    return (
      <View className='pins_detail'>
        <View className='pins_detail_wrapper'>
          <PinsItem {...detailInfo} onReFetchData={this.fetchPinsDetailData}
            origin='pins_detail'
            onChangeTargetComment={this.changeTargetComment.bind(this)}
          />
          <View className='pins_detail_comments'>
            <View className='pins_detail_title'>
              留言 · {this.state.replyList.length}
            </View>
            <View className='pins_detail_comments_reply'>
              {
                replyList.map(reply_info => (
                  <Reply {...reply_info} key={reply_info._id}
                    onChangeTargetComment={this.changeTargetComment.bind(this)}
                  />
                ))
              }
            </View>
          </View>
        </View>
        <Comment  {...{ reply_is_ordinary, reply_to_id }}
          onRefresh={this.refresh.bind(this)}
        />
      </View>
    )
  }
}

export default PinsDetail;