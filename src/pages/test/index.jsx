import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';

class Test extends Component {

  state = {
    hasUseInfo: false,
    userInfo: {},
    motto: 'hello world'
  };

  config = {
    navigationBarTitleText: '小公社'
  }


  authConfirmClick = (evt) => {
    console.log(evt.detail);
    const userRes = evt.detail;
    if (userRes.userInfo) {
      Taro.login({
        success: loginRes => {
          Taro.request({
            url: 'http://localhost:5000/user/login',
            data: {
              code: loginRes.code,
              encryptedData:  userRes.encryptedData,
              iv: userRes.iv,
              userInfo: userRes.userInfo
            },
            success: (res) => {
              const { data } = res;
              Taro.showModal({
                title: '登录成功',
                content: data.message
              });
              Taro.setStorageSync('TOKEN', data.Token);
              console.log(userRes, 'userRes')
              // Taro.$globalData.userInfo = userRes.userInfo;
              this.setState({
                userInfo: userRes.userInfo,
                hasUseInfo: true
              })
            }
          })
        }
      })
    }
  }

  getLoginInfo = () => {
    Taro.request({
      url: 'http://localhost:5000/home/test',
      header: {
        authorization: 'Bearer' + Taro.getStorageInfoSync('TOKEN'),
      },
      success: (res) => {
        if(res.statusCode === 200) {
          Taro.showToast({
            title: '获取成功',
          });
        } else {
          Taro.showToast({
            title: '请先登录',
            icon: 'none',
          })
        }
      },
      fail: () => {
        Taro.showToast({
          title: '请先登录',
          icon: 'none',
        })
      }
    })
  }
  handleValidate = () => {
    Taro.request({
      url: 'http://localhost:5000/user/test',
      method: 'POST',
      data: {},
      header: {
        authorization: 'Bearer ' + Taro.getStorageSync('TOKEN')
      },
      success: (res) => {
        console.log(res);
      },
      fail: (err) => {
        console.log(err);
      }
    })
  }

  render() {
    const { hasUseInfo, userInfo, motto } = this.state;
    return (
      <View className='test'>
        {
          hasUseInfo ? (
            <View>
              <image className='userinfo-avatar' src='{{userInfo.avatarUrl}}' mode='cover'></image>
              <text className='userinfo-nickname' >{userInfo.nickName}</text>
            </View>
          ) : (
              <Button className='modal_btn_confirm' openType='getUserInfo' onGetUserInfo={this.authConfirmClick}>获取用户信息授权</Button>
            )
        }
        <view className='usermotto'>
          <text className='user-motto'>{motto}</text>
        </view>
        <Button onClick={this.handleValidate}>验证token</Button>
      </View>
    )
  }
}

export default Test;