import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

// import './public/styles/common.less'
import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  componentDidMount() {
    // 将redux状态挂载Taro对象上，方便使用
    Taro.$store = store;
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  config = {
    pages: [
      'pages/pins/index',
      'pages/index/index',
      'pages/job_detail/index',
      'pages/publish/index',
      'pages/demo/index',
      'pages/home/index',
      'pages/test/index',
      'pages/rent_detail/index',
      'pages/rent/index',
      'pages/my/index',
      'pages/recordUpdate/index',
      'pages/offer/index',
      'pages/resume/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#f7f7f7',
      navigationBarTitleText: '友享社区',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true
    },
    tabBar: {
      position: 'bottom',
      selectedColor: '#007fff',
      list: [{
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: './public/images/index.png',
        selectedIconPath: './public/images/index_selected..png'
      }, {
        pagePath: "pages/home/index",
        text: "小公社",
        iconPath: './public/images/home.png',
        selectedIconPath: './public/images/home_selected..png',
      },{
        pagePath: "pages/my/index",
        text: "我的",
        iconPath: './public/images/my.png',
        selectedIconPath: './public/images/my_selected.png',
      }]
    },
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于小程序位置接口的效果展示'
      }
    }
  }

  
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
