import Taro, { Component } from '@tarojs/taro';
import { View, Button, Input } from '@tarojs/components';

import './index.less'
import { publishComment } from '../../client';

class Comment extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      reply_content: ''
    }
  }

  handlePublishClick = async () => {
    console.log('留言 == ', this.state.reply_content);
    const { reply_is_ordinary, reply_to_id } = this.props;
    const { reply_content } = this.state;
    let params = {
      reply_is_ordinary,
      reply_content: reply_content,
      reply_to_id
    };
    console.log('=== params ===', params);
    if(!reply_to_id) {
      Taro.showToast({title: '参数错误'});
      return;
    }
    let res = await publishComment(params);
    this.props.onRefresh();
  }

  handleSearchInput(evt) {
    let val = evt.detail.value

    this.setState({
      reply_content: val
    })
  }

  render() {
    return (
      <View className='comment'>
        <Input 
          placeholderClass='comment_input-placeholder' 
          className='comment_input' 
          onInput={this.handleSearchInput.bind(this)}
          placeholder='留下你的看法'
          value={this.state.search_val} 
        />
        <Button className='btn btn-comment'
          onClick={this.handlePublishClick}
          type='default'
          plain='true'
          size='mini'
        >
          留言
          </Button>
      </View>
    )
  }
}

export default Comment;