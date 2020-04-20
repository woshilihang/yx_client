import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, RichText, } from '@tarojs/components';
import { connect } from '@tarojs/redux'

import MyFooter from '../../components/Footer/index'
import { initAppAuth } from '../../actions/init'

import './index.less'
import { replaceSpaceToBr, transLangToName, drawImage } from '../../utils/common';
import { OPTS_CITY, OPTS_JOB } from '../../constants';
import { fetchJobDetail } from '../../client';

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

  async componentDidMount() {
    console.log(this.$router)
    const { jobId = '5e74ceb55f28640daa7ebd9e' } = this.$router.params;

    const res = await fetchJobDetail({
      job_id: jobId
    });
    console.log('岗位详情数据res ---', res)
    const {
      job_type,
      job_city,
      job_email,
      job_origin,
      job_desc,
      job_isOffical,
      job_company,
      job_name,
      job_id,
    } = res;
    this.setState({
      job_type,
      job_city,
      job_email,
      job_origin,
      job_desc,
      job_isOffical,
      job_company,
      job_name,
      job_id
    });
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
      job_id,
      job_name
    } = this.state;
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
              <Text className='location'
                onClick={drawImage}
              >{transLangToName(OPTS_CITY, job_city).join('、')}</Text>
              <Text className='jobs'>{transLangToName(OPTS_JOB, job_type)}</Text>
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
              <Text className='msg_txt'>{job_company.keyword}</Text>
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
              {transLangToName(OPTS_CITY, job_city).join('、')}
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
        <MyFooter email={job_email}
          content_id={job_id}
        />
      </View>
    )
  }
}

export default Job_Detail;