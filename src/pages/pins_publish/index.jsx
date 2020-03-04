import Taro, { Component } from '@tarojs/taro';
import { View, Textarea, Button, Text, Image } from '@tarojs/components';

import { MaxPinsUploadImg } from '../../config/index';
import '../../public/styles/common.less';
import './index.less';

class Offer extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      pins_desc: '',
      tempFiles: [], // 临时上传文件 {path: '', size: ''}
    }
  }

  config = {
    navigationBarTitleText: '沸点发布'
  }

  handleSubmit = () => {
    console.log('沸点发布提交');
  }

  handleUploadImg = () => {
    // 设置仅允许上传三张图片
    const _this = this;
    Taro.chooseImage({
      count: MaxPinsUploadImg, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // 拿到返回文件的路径，判断state是否已经该图片，存在不上传，否则累加，不覆盖上一张上传的
        // TODO: 合并新增数组，去重
        const tempFiles = res.tempFiles;
        _this.setState({
          tempFiles
        });
        console.log(res, 'res');
      }
    })
  }

  handleRemoveUploadImg = (path) => {
    // 接受需要移除上传图片的路径
    const { tempFiles } = this.state;
    const extraFiles = tempFiles.filter(file => file.path !== path);
    this.setState({
      tempFiles: extraFiles
    });
  }

  render() {
    const { pins_desc } = this.state;
    return (
      <View className='pins_publish'>
        <View className='pins_publish_wrapper'>
          <Textarea placeholderClass='publish_preview_opts-placeholder'
            className='publish_preview_opts_area'
            placeholder='据说在此许愿，已经入职的前辈们会助力offer哦'
            autoHeight
            value={pins_desc}
            onInput={(evt) => this.handleInputMsg(evt, 'job_desc')}
          />
          <View className='pins_publish_preview'>
            {
              this.state.tempFiles.map(file => (
                <Image src={file.path} 
                  className='pins_publish_preview_img' 
                  key={file.path}
                  onClick={() => this.handleRemoveUploadImg(file.path)}
                />
              ))
            }
            {
              this.state.tempFiles.length !== MaxPinsUploadImg && (
                <View className='pins_publish_get' onClick={this.handleUploadImg}>
                  <Text className='pins_publish_get_extra'>(选填)</Text>
                </View>
              )
            }
          </View>
        </View>
        <Button className='btn publish_btn' size='default' type='default'
          onClick={this.handleSubmit}
        >
          立即发布
        </Button>
      </View>
    )
  }
}

export default Offer;