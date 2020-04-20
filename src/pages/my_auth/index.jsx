import Taro, { Component } from '@tarojs/taro';
import { View, Input, Button, Text, Image } from '@tarojs/components';

import './index.less'

import jobImg from '../../public/images/job_show.png';
import { rootUrl } from '../../config';
import http from '../../utils/http';
import { fetchUserInfo } from '../../client';

class MyAuth extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      username: '',
      gender: '',
      wx: '',
      company: '',
      job_type: '',
      job_img: '',
    }
  }
  async componentDidMount() {
    // TODO: 先查询获取用户的基本信息
    const { userInfo = {} } = await fetchUserInfo();
    console.log(userInfo, 'userInfo')
    const { username, gender, wx, company, job_type, job_img } = userInfo;
    this.setState({
      username,
      gender,
      wx,
      company,
      job_type,
      job_img
    })
  }

  config = {
    navigationBarTitleText: '岗位发布认证'
  }


  handleInputMsg = (name, evt) => {
    this.setState({
      [name]: evt.detail.value
    });
  }

  handleUploadJobImg = () => {

  }

  handleUploadJobImg = () => {
    console.log('上传工作照');
    const that = this;
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],
      success: function (res) {
        const files = res.tempFiles;
        console.log(`files---`, files);
        Taro.uploadFile({
          url: `${rootUrl}/pins/upload`,
          filePath: files[0].path,
          name: 'file',
          formData: {
            'path': 'job_img', // 指明存储资源路径
          },
          success: uploadRes => {
            // console.log('uploadRes ---', uploadRes);
            const uploadMsg = JSON.parse(uploadRes.data);
            console.log(uploadMsg, 'uploadMsg');
            that.setState({
              job_img: uploadMsg.data.imgUrl
            }, () => {
              console.log('上传成功之后 ，图片 ---', that.state.job_img);
            });
          }
        })
      }
    })
  }

  handleSubmit = () => {
    const { username, gender, wx, company, job_type, job_img } = this.state;
    const params = {
      username,
      wx,
      gender,
      company,
      job_type,
      job_img
    };
    console.log('[params] ---', params);
    if(!company || !job_img) {
      Taro.showToast({
        title: '公司名称或工作证不能为空',
        icon: 'none',
        duration: 1000
      });
      return;
    }
    http.post('/user/update', params).then(res => {
      console.log(res, 'res');
      if (res) {
        Taro.navigateTo({
          url: `/pages/publish/index?companyName=${company}`,
        });
      }
    })
  }

  handleRemoveUploadImg = () => {
    // TODO: 还需要执行以下删除服务端已经上传的图片资源，通过图片资源参数，未提交信息返回页面也需要清除一下
    // 避免占用服务器资源
    this.setState({
      job_img: '',
    });
  }

  render() {
    console.log(this.state.job_img, 'this.state.job_img');
    const { username, gender, wx, company, job_type, job_img } = this.state;
    return (
      <View className='my_auth'>
        <View className='my_auth_title'>招聘前需内推</View>
        <View className='my_auth_desc'>请填写发布岗位所在公司任职情况，并上传相关工作证正面</View>
        <View className='my_auth_container'>
          <View className='my_auth_container_item'>
            <View className='my_auth_container_item_lable'>姓名</View>
            <Input
              placeholderClass='my_auth_container_item_input-placeholder'
              className='my_auth_container_item_input'
              onInput={this.handleInputMsg.bind(this, 'username')}
              value={username}
            // placeholder='请输入内容'
            />
          </View>
          <View className='my_auth_container_item'>
            <View className='my_auth_container_item_lable'>性别</View>
            <Input
              placeholderClass='my_auth_container_item_input-placeholder'
              className='my_auth_container_item_input'
              onInput={this.handleInputMsg.bind(this, 'gender')}
              value={gender}
            />
          </View>
          <View className='my_auth_container_item'>
            <View className='my_auth_container_item_lable'>微信</View>
            <Input
              placeholderClass='my_auth_container_item_input-placeholder'
              className='my_auth_container_item_input'
              onInput={this.handleInputMsg.bind(this, 'wx')}
              value={wx}
            />
          </View>
          <View className='my_auth_container_item'>
            <View className='my_auth_container_item_lable'>公司</View>
            <Input
              placeholderClass='my_auth_container_item_input-placeholder'
              className='my_auth_container_item_input'
              onInput={this.handleInputMsg.bind(this, 'company')}
              value={company}
            />
          </View>
          <View className='my_auth_container_item'>
            <View className='my_auth_container_item_lable'>岗位</View>
            <Input className='my_auth_container_item_input'
              onInput={this.handleInputMsg.bind(this, 'job_type')}
              placeholderClass='my_auth_container_item_input-placeholder'
              value={job_type}
            />
          </View>
          <View className='my_auth_container_item area'>
            <View className='my_auth_container_item_lable'>工作证</View>
            {
              this.state.job_img ? (
                <View className='my_auth_container_item_area'
                  onClick={this.handleRemoveUploadImg.bind(this)}
                >
                  <Image
                    src={`${rootUrl}${this.state.job_img}`}
                    className='my_auth_container_area_job_img'
                  />
                  <Text className='my_auth_container_area_del'></Text>
                </View>
              ) : (
                  <View
                    className='my_auth_container_item_area'
                    onClick={this.handleUploadJobImg.bind(this)}
                  >
                    <Image className='my_auth_container_area_img' src={jobImg}></Image>
                    <Text className='my_auth_container_area_text'>工作证正面照</Text>
                  </View>
                )
            }
          </View>
        </View>
        <Button className='btn btn-sub' onClick={this.handleSubmit.bind(this)}>立即开通</Button>
      </View>
    )
  }
}

export default MyAuth;