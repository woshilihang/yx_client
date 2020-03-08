import Taro, { Component } from '@tarojs/taro';
import { View, Button, Input } from '@tarojs/components';

import './index.less'

class Comment extends Component {

  handlePublishClick = () => {
    console.log('留言');
  }

  render() {
    return (
      <View className='comment'>
        <Input 
          placeholderClass='comment_input-placeholder' 
          className='comment_input' 
          onInput={this.handleSearchInput}
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