import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components';

import './index.less'

import collect from '../../public/images/collect.png'
import share from '../../public/images/share.png'
import post from '../../public/images/post.png'
import { publishUserCopy } from '../../client';


const JOB_DETAIL_ICON = {
  collect: collect,
  share: share,
  post: post,
}

class MyFooter extends Component {
  static defaultProps = {
    from: 'JOB_DETAIL',
    email: '',
    content_id: ''
  }
  handleCopyEvt(copy_val, content_id) {
    if(!content_id) {
      Taro.showToast({
        title: '复制失败，缺少ID',
        icon: 'none'
      })
      return void 0;
    }
    Taro.setClipboardData({
      data: copy_val,
      success: function () {
        Taro.getClipboardData({
          success: async function (res){
            let content = `复制邮箱成功: ${res.data}`
            console.log(content, 'contentcontent')
            // TODO: 记录一个请求 /user/publishCopy
            await publishUserCopy({
              copy_val,
              content_id
            })
            // Taro.showToast({
            //   title: '已复制',
            //   icon: 'success'
            // })
          }
        })
      }
    })
  }

  render() {
    const { from, content_id, email } = this.props;
    let tpl;
    if (from === 'JOB_DETAIL') {
      tpl = (
        <View className='footer_container'>
          <View className='footer_container_opts'>
            <View className='footer_container_opts_item'>
              <Image className='footer_container_opts_item_icon' src={JOB_DETAIL_ICON.collect} />
              <Text className='footer_container_opts_item_txt'>收藏</Text>
            </View>
            <Button className='footer_container_opts_item omit_btn_sty' openType='share' >
              <Image className='footer_container_opts_item_icon' src={JOB_DETAIL_ICON.share} />
              <Text className='footer_container_opts_item_txt'>分享</Text>
            </Button>
            <View className='footer_container_opts_item'>
              <Image className='footer_container_opts_item_icon' src={JOB_DETAIL_ICON.post} />
              <Text className='footer_container_opts_item_txt'>海报</Text>
            </View>
          </View>
          <Button onClick={
            this.handleCopyEvt.bind(this, email, content_id)
          }
            className='footer_container_btn' type='default' plain='true' size='mini'>复制投递邮箱</Button>
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