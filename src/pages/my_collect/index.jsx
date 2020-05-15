import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.less'
import { getCollectList } from '../../client';
import RentItem from '../../components/RentItem';

class MyCollect extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      list: []
    }
  }
  async componentDidMount() {
    let { list } = await getCollectList()
    this.setState({
      list
    })
  }

  config = {
    navigationBarTitleText: '我的收藏'
  }

  handleGoDetail(rent_id) {
    console.log(rent_id, 'rent_id --- 点击')
    Taro.navigateTo({
      url: `/pages/rent_detail/index?rent_id=${rent_id}`
    })
  }

  render() {
    const { list } = this.state
    return (
      <View className='my_collect'>
        <View className='my_collect_list'>
            {
              list.length && list.map(rent => (
                <RentItem key={rent._id}  {...rent} onGo={this.handleGoDetail.bind(this)} />
              ))
            }
          </View>
      </View>
    )
  }
}

export default MyCollect;