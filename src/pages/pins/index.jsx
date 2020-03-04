import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
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
    };
  }

  config = {
    navigationBarTitleText: 'Pins'
  }
  
  handleChangeType = (type) => {
    this.setState({
      active: type
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
            <PinsItem />
            <PinsItem />
            <PinsItem />
          </View>
        </View>

      </View>
    )
  }
}

export default Pins;