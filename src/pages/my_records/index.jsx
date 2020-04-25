import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.less';

class MyTrack extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      records_list: [
        {
          id: 1,
          time: '2020.4.21',
          content: [
            '增加客服消息&问题反馈入口',
            '增加发布房源模块，分为有房源求室友，无房源找房子小版块入口'
          ]
        },
        {
          id: 2,
          time: '2020.4.18',
          content: [
            '增加内推信息筛选条件搜索关键字相关功能',
            '完善内推专区首页轮播图信息区域，优化项目代码'
          ]
        },
        {
          id: 3,
          time: '2020.4.12',
          content: [
            '增加内推信息筛选条件搜索关键字相关功能',
            '完善内推专区首页轮播图信息区域，优化项目代码'
          ]
        },
        {
          id: 4,
          time: '2020.4.08',
          content: [
            '增加内推信息筛选条件搜索关键字相关功能',
            '完善内推专区首页轮播图信息区域，优化项目代码'
          ]
        },
        {
          id: 5,
          time: '2020.4.02',
          content: [
            '增加内推信息筛选条件搜索关键字相关功能',
            '完善内推专区首页轮播图信息区域，优化项目代码'
          ]
        },
        {
          id: 6,
          time: '2020.3.28',
          content: [
            '增加内推信息筛选条件搜索关键字相关功能',
            '完善内推专区首页轮播图信息区域，优化项目代码'
          ]
        },
        {
          id: 7,
          time: '2020.3.24',
          content: [
            '增加内推信息筛选条件搜索关键字相关功能',
            '完善内推专区首页轮播图信息区域，优化项目代码'
          ]
        }
      ]
    }
  }

  config = {
    navigationBarTitleText: '更新记录'
  }

  render() {
    const { records_list } = this.state;
    return (
      <View className='my_records'>
        {
          records_list.length && records_list.map(record => (
            <View className='my_records_list' key={record.id}>
              <View className='my_records_title'>{record.time}</View>
              <View className='my_records_content'>
                {
                  record.content.length && record.content.map((item, index) => (
                    <View className='my_records_content' key={index}>
                     {index + 1}、{item}
                    </View>
                  ))
                }
              </View>
            </View>
          ))
        }

      </View>
    )
  }
}

export default MyTrack;