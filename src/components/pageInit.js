import Taro from '@tarojs/taro';
// import auth from '../utils/auth';

/**
 * 初始化分享信息
 * @param {state} state 
 */
function initShareMenu(state) {
  if(state && state.canShare) {
    Taro.showShareMenu({
      withShareTicket: false
    });
  } else {
    Taro.hideShareMenu();
  }
}

/**
 * 根据业务情况将授权，分享等全部进行归一化处理
 * 页面内通过 @pageInit() 进行装饰即可
 */
function pageInit() {
  return function Component(WrapComponent) {
    return class PAGEINIT extends WrapComponent {
      constructor(props) {
        super(props)
      }

      // onload
      componentWillMount() {
        // 初始化分享信息
        console.log('page willmount')
        console.log(this.state)
        initShareMenu(this.state);
      }

      // 阻塞didmount，鉴权
      async componentDidMount() {
        // console.log('pageInit didmount')
        // let result = await auth.appCheckAuth();
        // // 授权成功
        // if(result) {
        //   // 调用父组件的函数
        //   super.componentDidMount && super.componentDidMount();
        // } else {
        //   // 授权失败
        //   Taro.showToast({
        //     title: '授权失败',
        //     icon: 'none',
        //     mask: true,
        //   })
        // }
        super.componentDidMount && super.componentDidMount();
      }

      // 重写分享
      onShareAppMessage() {
        let shareOptions = super.onShareAppMessage();
        // 如果当前页面配置分享使用配置的
        if(shareOptions ) return shareOptions;
        // 默认分享
        return {
          title: '点击查看更多内推沸点租房信息吧！！'
        }
      }

      onPullDownRefresh() {
        if(super.onPullDownRefresh) {
          super.onPullDownRefresh();
          setTimeout(() => {
            Taro.stopPullDownRefresh();
          }, 1500);
        }
      }
    }
  }
}


export default pageInit;