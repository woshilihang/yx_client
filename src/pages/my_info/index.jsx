import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Input, Button } from '@tarojs/components';

import '../../public/styles/common.less'
import './index.less';
import { fetchUserInfo, updateUserInfo } from '../../client';

class MyInfo extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      username: '',
      wx: '',
      scholl: '',
      grade: '',
      companyName: '',
      job_type: '',
      job_time: '',
      nickName: '',
      gender: '',
      avatarUrl: '',
    }
  }

  async componentDidMount() {
    const userData = Taro.getStorageSync('userInfo');
    console.log(userData, 'userData storage ---')
    const { nickName, avatarUrl, gender } = userData;
    const { userInfo = {} } = await fetchUserInfo();
    console.log(userInfo, 'userInfo')
    const { username, wx, company, job_type, job_time, scholl, grade } = userInfo;
    this.setState({
      username,
      wx,
      companyName: company,
      job_type,
      nickName,
      avatarUrl,
      gender: gender == 1 ? '男' : '女',
      job_time,
      scholl,
      grade
    });
  }

  config = {
    navigationBarTitleText: '个人资料',
  }


  handleContentInput(name, evt) {
    console.log('handleContentInput ect --', evt);
    const val = evt.detail.value;
    this.setState({
      [name]: val
    });
  }

  // 选择在职时间， Picker 时间选择器
  handleOnJobTimeClick() {
    console.log('选择在职时间');
  }

  async handleSubmit() {
    console.log('保存个人资料');
    const {
      username,
      wx,
      scholl,
      grade,
      companyName,
      job_time,
      job_type,
    } = this.state

    const params = {
      username,
      wx,
      scholl,
      grade,
      company: companyName,
      job_time,
      job_type,
    };

    // update
    const res =  await updateUserInfo(params);
    console.log('更新个人信息接口返回res ---', res);
    if(res) {
      Taro.showToast({
        title: '个人资料保存成功',
        icon: 'success',
        success: () => {
          Taro.switchTab({
            url: '/pages/my/index',
          });
        }
      })
    }
  }

  render() {
    const { nickName, username, wx, gender, avatarUrl, scholl, grade, job_type, companyName } = this.state;
    return (
      <View className='my_info'>
        <View className='my_info_title'>基本信息</View>
        <View className='my_info_list'>
          <View className='my_info_list_item'>
            <Text className='my_info_list_item_label'>头像</Text>
            <View className='my_info_list_item_content'>
              <Image className=' avatar_img' src={avatarUrl} />
            </View>
          </View>
          <View className='my_info_list_item'>
            <Text className='my_info_list_item_label'>昵称</Text>
            <Input className='my_info_list_item_content'
              onInput={this.handleContentInput.bind(this)}
              value={nickName}
              disabled
            />
          </View>
          <View className='my_info_list_item'>
            <Text className='my_info_list_item_label'>姓名</Text>
            <Input className='my_info_list_item_content'
              onInput={this.handleContentInput.bind(this, 'username')}
              value={username}
              placeholder='选填'
            />
          </View>
          <View className='my_info_list_item'>
            <Text className='my_info_list_item_label'>性别</Text>
            <Input className='my_info_list_item_content'
              onInput={this.handleContentInput.bind(this)}
              value={gender}
              disabled
            />
          </View>
          <View className='my_info_list_item'>
            <Text className='my_info_list_item_label'>微信号</Text>
            <Input className='my_info_list_item_content'
              onInput={this.handleContentInput.bind(this, 'wx')}
              value={wx}
              placeholder='选填'
            />
          </View>
        </View>

        {/* 学校信息 */}
        <View className='my_info_title'>学校信息</View>
        <View className='my_info_list'>
          <View className='my_info_list_item'>
            <Text className='my_info_list_item_label'>学校</Text>
            <Input className='my_info_list_item_content'
              onInput={this.handleContentInput.bind(this, 'scholl')}
              value={scholl}
              placeholder='必填'
            />
          </View>
          <View className='my_info_list_item'>
            <Text className='my_info_list_item_label'>年级</Text>
            <Input className='my_info_list_item_content'
              onInput={this.handleContentInput.bind(this, 'grade')}
              value={grade}
              placeholder='选填'
            />
          </View>
        </View>

        {/* 公司信息 */}
        <View className='my_info_title'>公司信息</View>
        <View className='my_info_list'>
          <View className='my_info_list_item'>
            <Text className='my_info_list_item_label'>公司名称</Text>
            <Input className='my_info_list_item_content'
              onInput={this.handleContentInput.bind(this, 'companyName')}
              value={companyName}
            />
          </View>
          <View className='my_info_list_item'>
            <Text className='my_info_list_item_label'>所在岗位</Text>
            <Input className='my_info_list_item_content'
              onInput={this.handleContentInput.bind(this, 'job_type')}
              value={job_type}
            />
          </View>
          <View className='my_info_list_item'>
            <Text className='my_info_list_item_label'>在职时间</Text>
            <Input className='my_info_list_item_content'
              disabled
              onClick={this.handleOnJobTimeClick.bind(this)}
            />
          </View>
        </View>

        {/* 提交信息 */}
        <Button className='btn publish_btn' size='default' type='default'
          onClick={this.handleSubmit}
        >
          保存
        </Button>
      </View>
    )
  }
}

export default MyInfo;