import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import JDItem from '../../components/JDItem';
import { fetchUserPublish } from '../../client';

import  './index.less'

class MyPublish extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      jobs_list: []
    }
  }


  async componentDidMount() {
   let { list } =  await fetchUserPublish()
   console.log('list ---', list)
   this.setState({
     jobs_list: list
   })
  }

  config = {
    navigationBarTitleText: '我发布的'
  }

  goToJobDetailPage = (id) => {
    Taro.navigateTo({
      url: `/pages/job_detail/index?jobId=${id}`
    })
  }

  render() {
    return (
      <View className='my_publish'>
        <View className='jd_item_list'>
          {
            this.state.jobs_list.map(job_item => (
              <JDItem
                key={job_item.id}
                {...job_item}
                onGo={this.goToJobDetailPage}
              />
            ))
          }
        </View>
      </View>
    )
  }
}

export default MyPublish;