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
        {
          id: 1,

        }
      ]
    };
  }

  async componentDidMount() {
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
      jobs_list: list,
      jobTotalNum: total,
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

  handleGoToDetail = (pins_id) => {
    console.log(1111, pins_id)
    if (!pins_id) {
      Taro.showToast({
        title: '该沸点不存在ID'
      })
      return;
    };
    Taro.navigateTo({
      url: `/pages/pins_detail/index?pins_id=${pins_id}`,
    });
  }

  render() {
    const { opts, active } = this.state;
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
              this.state.pins_list.map(pins => (
                <PinsItem key={pins._id} {...pins}
                  onGo={this.handleGoToDetail}
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