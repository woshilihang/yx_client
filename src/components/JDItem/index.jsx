import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import './index.less'
import exampleImg from '../../public/images/mi.png'

class JDItem extends Component {
  static defaultProps = {
    title: '出海电商增长运营实习生',
    company: '小米',
    origin: '内推',
    jobs: '运营',
    address: '北京',
    img: exampleImg
  }

  render() {
    const { title, company, origin, jobs, address, img, job_id } = this.props;
    return (
      <View className='jd_item' onClick={() => {this.props.onGo(job_id)}}>
        <Image className='jd_item_img' src={img} />
        <View className='jd_item_content'>
          <View className='jd_item_content_title'>{title}</View>
          <View className='jd_item_content_detail co'>
            <Text className='company'>{company}</Text>
            <Text className='origin'>{origin}</Text>
          </View>
          <View className='jd_item_content_detail jl'>
            <Text className='jobs'>{jobs}</Text>
            <Text className='location'>{address}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default JDItem;