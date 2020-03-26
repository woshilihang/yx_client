import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import './index.less'
import { transLangToName } from '../../utils/common';
import { OPTS_JOB, OPTS_CITY } from '../../constants';
// import exampleImg from '../../public/images/mi.png'

class JDItem extends Component {
  static defaultProps = {
    job_name: '出海电商增长运营实习生',
    job_company: {
      companyName: '小米',
      imgUrl: ''
    },
    job_origin: '内推',
    job_type: '运营',
    job_city: ['北京'],
    // img: exampleImg
  }

  render() {
    const { job_name, job_company, job_origin, job_type, job_city, job_id } = this.props;
    return (
      <View className='jd_item' onClick={() => {this.props.onGo(job_id)}}>
        <Image className='jd_item_img' src={job_company.imgUrl} />
        <View className='jd_item_content'>
          <View className='jd_item_content_title'>{job_name}</View>
          <View className='jd_item_content_detail co'>
            <Text className='company'>{job_company.companyName}</Text>
            <Text className='origin'>{job_origin}</Text>
          </View>
          <View className='jd_item_content_detail jl'>
            <Text className='jobs'>{transLangToName(OPTS_JOB ,job_type)}</Text>
            <Text className='location'>{transLangToName(OPTS_CITY ,job_city).join('、')}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default JDItem;