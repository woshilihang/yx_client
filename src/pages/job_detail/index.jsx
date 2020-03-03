import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, RichText } from '@tarojs/components';
import { connect } from '@tarojs/redux'

import MyFooter from '../../components/Footer/index'
import { initAppAuth } from '../../actions/init'

import './index.less'
import { replaceSpaceToBr } from '../../utils/common';

@connect(({ init, }) => ({ init }), (dispatch) => ({
  onInitAppAuth(payload) {
    dispatch(initAppAuth(payload))
  }
}))
class Job_Detail extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      job_type: '',
      job_city: [],
      job_email: '',
      job_origin: '',
      job_desc: '',
      job_isOffical: false,
      job_company: {},
      job_name: '',
    };
  }

  componentDidMount() {
    console.log(this.props.init, 'init app detail')
    console.log(this.$router)
    const { jobId = '5e57860b39d80785d14ed389' } = this.$router.params;

    Taro.request({
      url: 'http://localhost:5000/job/detail',
      data: {
        job_id: jobId
      },
      success: (res) => {
        console.log(res);
        if (res.data.code === 200) {
          const {
            job_type,
            job_city,
            job_email,
            job_origin,
            job_desc,
            job_isOffical,
            job_company,
            job_name
          } = res.data.data;
          this.setState({
            job_type,
            job_city,
            job_email,
            job_origin,
            job_desc,
            job_isOffical,
            job_company,
            job_name
          });
        }
      },
      fail: (err) => {
        console.log(err);
        Taro.showModal({
          title: '获取信息数据失败',
          content: '请稍后重试'
        });
      }
    })
  }

  config = {
    navigationBarTitleText: '职位详情'
  }

  render() {
    const { job_type,
      job_city = [],
      job_email,
      job_origin,
      job_desc,
      job_isOffical,
      job_company,
      job_name } = this.state;
    console.log(this.state.job_isOffical, '转正')
    return (
      <View className='job_detail'>
        <View className='job_detail_wrapper'>
          <View className='job_detail_header'>
            <Image className='job_detail_img' src={job_company.imgUrl} />
            <View className='job_detail_title'>
              {job_name}
            </View>
            <View className='job_detail_company' onClick={
              () => this.props.onInitAppAuth(false)
            }
            >
              {job_company.companyName}
            </View>
            <View className='job_detail_msg'>
              <Text className='location'>{job_city.join('、')}</Text>
              <Text className='jobs'>{job_type}</Text>
              <Text className='origin'>{job_origin}</Text>
            </View>
          </View>

          <View className='job_detail_flag'>
            <View className='msg'>
              <Text className='msg_label'>公司名称</Text>
              <Text className='msg_txt'>{job_company.companyName}</Text>
            </View>
            <View className='msg'>
              <Text className='msg_label'>公司口号</Text>
              <Text className='msg_txt'>{job_company.moto}</Text>
            </View>
          </View>

          <View className='job_detail_preview'>
            <View className='job_detail_preview_title'>
              职位描述
          </View>
            <View className='job_detail_preview_content'>
              <RichText nodes={(replaceSpaceToBr(job_desc))} />
            </View>

            <View className='job_detail_preview_title'>
              投递邮箱
          </View>
            <View className='job_detail_preview_content'>
              <View className='msg'>
                <Text>投递邮箱</Text>
                <Text>{job_email}</Text>
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
              {job_city.join('、')}
            </View>
            {
              job_isOffical && (
                <View>
                  <View className='job_detail_preview_title'>
                    转正机会
                </View>
                  <View className='job_detail_preview_content'>
                    实习期间表现良好能够提前转正
                </View>
                </View>
              )
            }
          </View>
        </View>
        <MyFooter />
      </View>
    )
  }
}

export default Job_Detail;