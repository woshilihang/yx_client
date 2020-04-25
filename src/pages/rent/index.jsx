import Taro, { Component } from '@tarojs/taro';
import { AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { View, Image, Button, Input } from '@tarojs/components';

import 'taro-ui/dist/style/components/activity-indicator.scss'
import 'taro-ui/dist/style/components/loading.scss';
import "taro-ui/dist/style/components/action-sheet.scss";
import './index.less'
import pageInit from '../../components/pageInit';
import { OPTS_CITY } from '../../constants';
import RentItem from '../../components/RentItem';

@pageInit()
class Rent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canShare: '',
      search_val: '',
      opts_list: [
        {
          id: 'city',
          name: '城市',
          lang: '',
          curr_val: ''
        },
        {
          id: 'price',
          name: '价格',
          lang: '',
          curr_val: ''
        },
        {
          id: 'sex',
          name: '性别',
          lang: '',
          curr_val: ''
        },
        {
          id: 'house',
          name: '有无房源',
          lang: '',
          curr_val: ''
        },
        {
          id: 'shortRent',
          name: '可短租',
          lang: '',
          curr_val: ''
        }
      ],
      isOpened: false,
      sheet_list: [],
      rent_list: [
        {
          _id: '1123',
          rent_img: 'https://img10.360buyimg.com/ling/jfs/t1/103195/16/19813/256783/5ea170aeE02b283d7/668b27c28863bac7.jpg',
          userInfo: {
            nickName: 'test',
          }
        },
        {
          _id: '1123',
          rent_img: 'https://img11.360buyimg.com/ling/jfs/t1/113645/40/2325/202915/5ea170b1Ecef27ae4/5856c434a61e3b38.jpg',
          userInfo: {
            nickName: 'test',
          }
        },
      ],
    }
  }

  config = {
    navigationBarTitleText: '租房专区'
  }

  //分享
  onShareAppMessage() {
    return {
      title: '友享社区，解决你的校园&职前问题！！'
    }
  }

  handleSearchInput = (evt) => {
    this.setState({
      search_val: evt.detail.value
    }, () => {
      console.log('search_val 搜索内容为', this.state.search_val)
    })
  }

  handleConfirmInput = () => {
    // 关键字搜索结果展示
  }

  changeOptsActive = ({id, lang, name}) => {
    let newOptsList = []
    this.state.opts_list.forEach(opts => {
      if(id === opts.id) {
        newOptsList.push({
          ...opts,
          lang: id === opts.id ? lang: '', // 存储英文值
          curr_val: (id === opts.id && name && lang) ? name : ''
        });
      } else {
        newOptsList.push(opts)
      }
    });
    this.setState({
      opts_list: newOptsList,
      isOpened: false
    });
  }

  getSheetListData = (id) => {
    const keyMapOfSheetList = {
      'city': OPTS_CITY,
      'price': [
        {
          id: 0,
          name: '不限',
          lang: '',
          belong: 'price'
        },
        {
          id: 1,
          name: '高到低',
          lang: '1',
          belong: 'price'
        },
        {
          id: 2,
          name: '低到高',
          lang: '2',
          belong: 'price'
        },
      ],
      'sex': [
        {
          id: 0,
          name: '不限',
          lang: '',
          belong: 'sex'
        },
        {
          id: 1,
          name: '男生',
          lang: '1',
          belong: 'sex'
        },
        {
          id: 2,
          name: '女生',
          lang: '2',
          belong: 'sex'
        },
      ],
      'house': [
        {
          id: 0,
          name: '不限',
          lang: '',
          belong: 'house',
        },
        {
          id: 1,
          name: '有房求室友',
          lang: '1',
          belong: 'house',
        },
        {
          id: 2,
          name: '无房找房源',
          lang: '2',
          belong: 'house',
        },
      ],
      'shortRent': [],
    }
    // 设置吸底面板的列表内容
    return keyMapOfSheetList[id] || []
  }

  handleFilterClick(id) {
    // TODO: 根据筛选条件进行内容过滤
    // 设置当前sheet_list列表展示内容
    this.setState({
      sheet_list: [],
      isOpened: false
    }, () => {
      if (id === 'shortRent') {
        this.changeOptsActive(id);
      } else {
        const sheetList = this.getSheetListData(id)
        this.setState({
          isOpened: true,
          sheet_list: sheetList
        });
      }
    })
  }

  handleAtActionSheetClick(city) {
    const {belong, lang, name} = city
    console.log(111, city, belong, lang, name)
    this.changeOptsActive({id: belong, lang, name});
  }

  handleCancel = () => {
    this.setState({
      isOpened: false,
    })
  }

  handlePublishClick = () => {
    Taro.navigateTo({
      url: `/pages/rent_auth/index`
    })
  }
  render() {
    const { search_val, opts_list, sheet_list, isOpened, rent_list = [] } = this.state;
    return (
      <View className='rent'>

        <AtActionSheet className='self_atactionsheet' isOpened={isOpened}
          cancelText='取消'
          onCancel={this.handleCancel}
        >
          {
            sheet_list.map(city => (
              <AtActionSheetItem onClick={this.handleAtActionSheetClick.bind(this, city)} key={city.id}>
                {city.name}
              </AtActionSheetItem>
            ))
          }
        </AtActionSheet>
        {/* banner广告区域 */}
        <View className='banner'>
          <Image className='banner_img' src='https://uploadfiles.nowcoder.com/images/20191115/999991356_1573798849904_2D17C168A3C204ACB9D89CA6B517DB73' />
        </View>
        <View className='rent_wrapper'>
          <View className='rent_wrapper_opts'>
            {
              opts_list.map(opts => (
                <View
                  className={`rent_wrapper_opts_item ${opts.id === 'shortRent' ? '' : 'opts'} ${opts.curr_val ? 'active' : ''}`} key={opts.id}
                  onClick={this.handleFilterClick.bind(this, opts.id)}
                >
                  {opts.curr_val || opts.name}
                </View>
              ))
            }
          </View>
          <View className='rent_wrapper_search'>
            <Input
              placeholderClass='header_search_input-placeholder'
              className='header_search_input' confirm-type='search'
              onInput={this.handleSearchInput}
              onConfirm={this.handleConfirmInput}
              placeholder='可搜索实习单位，找到实习同伴'
              value={search_val}
            />
          </View>
          <View className='rent_wrapper_opts_list'>
            {
              rent_list.length && rent_list.map(rent => (
                <RentItem key={rent._id}  {...rent} />
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

export default Rent;