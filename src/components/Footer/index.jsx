import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components';

import './index.less'

import collect from '../../public/images/collect.png'
import share from '../../public/images/share.png'
import post from '../../public/images/post.png'


const JOB_DETAIL_ICON = {
  collect: collect,
  share: share,
  post: post,
}

class MyFooter extends Component {
  static defaultProps = {
    from: 'JOB_DETAIL'
  }

  render() {
    const { from } = this.props;
    let tpl;
    if(from === 'JOB_DETAIL') {
      tpl = (
        <View className='footer_container'>
          <View className='footer_container_opts'>
            <View className='footer_container_opts_item'>
              <Image className='footer_container_opts_item_icon' src={JOB_DETAIL_ICON.collect} />
              <Text className='footer_container_opts_item_txt'>收藏</Text>
            </View>
            <View className='footer_container_opts_item'>
              <Image className='footer_container_opts_item_icon' src={JOB_DETAIL_ICON.share} />
              <Text className='footer_container_opts_item_txt'>分享</Text>
            </View>
            <View className='footer_container_opts_item'>
              <Image className='footer_container_opts_item_icon' src={JOB_DETAIL_ICON.post} />
              <Text className='footer_container_opts_item_txt'>海报</Text>
            </View>
          </View>
          <Button className='footer_container_btn' type='default' plain='true' size='mini'>复制投递邮箱</Button>
        </View>
      )
    } else {
      tpl = (
        <View>底部</View>
      )
    }
    return (
      <View className='my_footer'>
        {tpl}
      </View>
    )
  }
}

export default MyFooter;