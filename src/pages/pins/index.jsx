import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components';
import PinsItem from '../../components/pinsItem/index';

import testImg from '../../public/images/test.jpeg';
// import '../../public/styles/common.less';
// common样式不起作用
import './index.less';
import { fetchPinsList } from '../../client';


class Pins extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      opts: [
        {
          id: 1,
          name: '全部',
          type: 'all'
        },
        {
          id: 2,
          name: '热门',
          type: 'hot'
        },
      ],
      active: 'all',
      currPageNum: 1,
      totlaNum: 0,
      pins_list: [
      ]
    };
  }

  async componentDidMount() {
    console.log('沸点数据加载中....')
  }

  async componentDidShow() {
    console.log('componentDidShow....')
    Taro.showLoading({
      title: '加载中...'
    })
    await this.fetchPinsListHandle()
  }

  fetchPinsListHandle = async () => {
    const { active, currPageNum } = this.state;
    let res = await fetchPinsList(`/pins/list?job_type=${active}&nextPageNum=${currPageNum}`);
    const { list, total, currentNum } = res;
    Taro.hideLoading();
    this.setState({
      loading: false,
      pins_list: list,
      totlaNum: total,
      currPageNum: currentNum
    });
  }


  config = {
    navigationBarTitleText: '沸点板块'
  }


  handleChangeType = (type) => {
    this.setState({
      active: type
    });
  }

  handlePublishClick = () => {
    Taro.navigateTo({
      url: '/pages/pins_publish/index'
    });
  }

  handleGoToDetail(evt, pins_id) {
    console.log(1111, pins_id)
    evt.stopPropagation()
    if (!pins_id) {
      Taro.showToast({
        title: '该沸点不存在ID',
        icon: 'none'
      })
      return;
    };
    Taro.navigateTo({
      url: `/pages/pins_detail/index?pins_id=${pins_id}`,
    });
  }

  handleReFetchData(id, num) {
    // 根据ID值去改变对应的点赞的数量以及状态
    const { pins_list }  = this.state
    let newPinsListData = []
    for(let i = 0, len = pins_list.length; i < len; i++) {
      if(pins_list[i]._id === id) {
        newPinsListData.push({
          ...pins_list[i],
          pins_prize_self: !pins_list[i].pins_prize_self,
          pins_prize_num: num
        });
      } else {
        newPinsListData.push(pins_list[i])
      }
    }
    this.setState({
      pins_list: newPinsListData
    });
  }

  render() {
    const { opts, active, pins_list = [] } = this.state;
    return (
      <View className='pins'>
        {/* banner广告区域 */}
        <View className='banner'>
          <Image className='banner_img' src={testImg} />
        </View>

        <View className='pins_wrapper'>
          <View className='pins_wrapper_opts'>
            {
              opts.map(opt => (
                <View
                  className={`pins_wrapper_opts_item ${opt.type === active ? 'active' : ''}}`}
                  key={opt.id}
                  onClick={() => this.handleChangeType(opt.type)}
                >
                  <Text>
                    {
                      opt.name
                    }
                  </Text>
                </View>
              ))
            }
          </View>

          <View className='pins_wrapper_opts_list'>
            {
              pins_list.length && pins_list.map(pins => (
                <PinsItem key={pins._id} {...pins}
                  origin='pins'
                  onGo={this.handleGoToDetail.bind(this)}
                  onReFetchData={this.handleReFetchData.bind(this)}
                />
              ))
            }
          </View>
        </View>
        <Button className='btn btn-pub'
          onClick={this.handlePublishClick}
          type='default'
          plain='true'
          size='mini'
        >
          发布
          </Button>
      </View>
    )
  }
}

export default Pins;