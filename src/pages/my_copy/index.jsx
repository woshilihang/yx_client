import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import JDItem from '../../components/JDItem';
import { fetchUserCopy } from '../../client';

import './index.less'

class MyCopy extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      copy_list: []
    }
  }


  async componentDidMount() {
    let { list } = await fetchUserCopy()
    console.log('list ---', list)
    this.setState({
      copy_list: list
    })
  }

  config = {
    navigationBarTitleText: '我复制的'
  }

  goToJobDetailPage = (id) => {
    Taro.navigateTo({
      url: `/pages/job_detail/index?jobId=${id}`
    })
  }

  render() {
    return (
      <View className='my_copy'>
        <View className='jd_item_list'>
          {
            this.state.copy_list.map(job_item => (
              <View className='my_copy_item'  key={job_item.id}>
                <JDItem
                  key={job_item.id}
                  {...job_item}
                  onGo={this.goToJobDetailPage}
                />
                <View className='my_copy_item_info'>
                  <View className='my_copy_item_info_label'>
                    投递邮箱
                  </View>
                  <View className='my_copy_item_info_txt'>
                    {job_item.copy_val}
                  </View>
                </View>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}

export default MyCopy;