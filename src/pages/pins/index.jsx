import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components';
import PinsItem from '../../components/pinsItem/index';

import testImg from '../../public/images/test.jpeg';
// import '../../public/styles/common.less';
// common样式不起作用
import './index.less';


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

  componentDidMount() {
    Taro.showLoading({
      title: '加载中...'
    })
    const { currPageNum, active } = this.state;
    Taro.request({
      url: `http://localhost:5000/pins/list?job_type=${active}&nextPageNum=${currPageNum}`,
    }).then(res => {
      Taro.hideLoading()
      console.log(res.data);
      if (res.data.code === 200) {
        this.setState({
          loading: false,
          pins_list: res.data.data.list,
          totlaNum: res.data.data.total,
          currPageNum: res.data.data.currentNum
        });
      }
    })
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
    if(!pins_id) return;
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