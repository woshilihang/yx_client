import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux'

import MyFooter from '../../components/Footer/index'
import { initAppAuth } from '../../actions/init'

import './index.less'

@connect(({ init, }) => ({ init }), (dispatch) => ({
  onInitAppAuth(payload) {
    dispatch(initAppAuth(payload))
  }
}))
class Job_Detail extends Component {


  componentDidMount() {
    console.log(this.props.init, 'init app detail')
  }

  config = {
    navigationBarTitleText: '职位详情'
  }

  render() {
    return (
      <View className='job_detail'>
        <View className='job_detail_header'>
          <Image className='job_detail_img' src='https://uploadfiles.nowcoder.com/files/20190715/9398821_1563179722928_120.png' />
          <View className='job_detail_title'>
            项目管理
          </View>
          <View className='job_detail_company' onClick={
            () => this.props.onInitAppAuth(false)
          }
          >
            滴滴出行
          </View>
          <View className='job_detail_msg'>
            <Text className='location'>北京</Text>
            <Text className='jobs'>运营</Text>
            <Text className='origin'>HR发布</Text>
          </View>
        </View>

        <View className='job_detail_flag'>
          <View className='msg'>
            <Text className='msg_label'>公司名称</Text>
            <Text className='msg_txt'>滴滴出行</Text>
          </View>
          <View className='msg'>
            <Text className='msg_label'>公司口号</Text>
            <Text className='msg_txt'>滴滴一下，美好出行</Text>
          </View>
        </View>

        <View className='job_detail_preview'>
          <View className='job_detail_preview_title'>
            职位描述
          </View>
          <View className='job_detail_preview_content'>
            实习招聘
          </View>
          <View className='job_detail_preview_title'>
            投递邮箱
          </View>
          <View className='job_detail_preview_content'>
            <View className='msg'>
              <Text>投递邮箱</Text>
              <Text>frankchenfan@didiglobal.com</Text>
            </View>
            <View className='msg'>
              <Text>简历名称</Text>
              <Text>姓名+岗位+学校+实习周期+友享社区</Text>
            </View>
          </View>
          <View className='job_detail_preview_title'>
            工作城市
          </View>
          <View className='job_detail_preview_content'>
            北京
          </View>
        </View>

        <MyFooter />
      </View>
    )
  }
}

export default Job_Detail;