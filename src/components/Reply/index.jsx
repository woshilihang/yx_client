import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';

import './index.less'

class Reply extends Component {

  constructor() {
    super(...arguments);
    this.state = {
    };
  }

  render() {
    console.log(this.props);
    const { reply_content, userInfo = {}, reply_childs = [], _id } = this.props;
    const { nickName, avatar } = userInfo;
    return (
      <View className='reply'>
        <Image className='reply_avatar' src={avatar} />
        <View className='reply_info'>
          <View className='reply_info_title'>{nickName}</View>
          <View className='reply_info_content' onClick={(evt) => {
            this.props.onChangeTargetComment(evt, false, _id)
          }}
          >
            <View className='reply_info_desc'>{reply_content}</View>
            {
              reply_childs.length && <View className='reply_other_list'>
                {
                  reply_childs.map((reply_child, index) => (
                    <View className='reply_other_list_item' key={index}>
                      <Image className='reply_other_list_item_avatar' src={reply_child.userInfo.avatar ? reply_child.userInfo.avatar : ''} />
                      {reply_child.userInfo.nickName && (<Text className='reply_other_list_item_text'>
                        {reply_child.userInfo.nickName}
                      </Text>
                      )}
                      <Text className='reply_other_list_item_text'>
                        回复：
                        </Text>
                      {/* <Text className='reply_other_list_item_text'>
                          @陈剑Neptune:
                        </Text> */}
                      <Text className='reply_other_list_item_say'>
                        {reply_child.reply_content}
                      </Text>
                    </View>
                  ))
                }
              </View>
            }
          </View>
        </View>
        <View className='reply_feature'>
          <View className='reply_feature_txt prize'>0</View>
        </View>
      </View>
    )
  }
}

export default Reply;