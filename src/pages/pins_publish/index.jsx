import Taro, { Component } from '@tarojs/taro';
import { View, Textarea, Button, Text, Image, Canvas } from '@tarojs/components';

import { MaxPinsUploadImg } from '../../config/index';
import '../../public/styles/common.less';
import './index.less';

class PinsPublish extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      pins_desc: '',
      tempFiles: [], // 临时上传文件 {path: '', size: ''}
      isShowCanvas: false,
    }
  }

  config = {
    navigationBarTitleText: '沸点发布'
  }

  handleSubmit = () => {
    // this.drawImage();
    const { pins_desc, tempFiles } = this.state;
    const pins_imgList = tempFiles.map(file => file.imgUrl);
    const params = {
      pins_desc,
      pins_imgList
    };
    console.log('沸点发布提交参数 ---, ', params);
    Taro.request({
      url: 'http://localhost:5000/pins/publish',
      data: JSON.stringify(params),
      method: 'POST',
      header: {
        authorization: 'Bearer ' + Taro.getStorageSync('TOKEN'),
        ContentType: 'application/json',
      },
      success: res => {
        console.log(res, 'res 发布');
        const data = res.data;
        Taro.showModal({
          title: '发布成功',
          content: data.message,
          success: function() {
            Taro.navigateTo({
              url: '/pages/pins/index',
            });
          }
        });
      },
      fail: err => {
        console.log(err, 'err');
        Taro.showModal({
          title: '提示',
          content: '沸点发布失败'
        });
      }
    })
  }

  handleUploadImg = () => {
    // 设置仅允许上传三张图片
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    // 拿到返回文件的路径，判断state是否已经该图片，存在不上传，否则累加，不覆盖上一张上传的
    // TODO: 合并新增数组，去重
    // const tempFiles = res.tempFiles;
    // _this.setState({
    //   tempFiles
    // });
    // TODO: 这里调用文件上传，多文件上传
    // Taro.uploadFile({})
    const that = this;
    Taro.chooseImage({
      count: MaxPinsUploadImg, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: async function (res) {
        console.log('选择图片 ---', res);
        const files = res.tempFiles;
        let waitUploadArr = [];
        for (let i = 0, len = files.length; i < len; i++) {
          waitUploadArr.push(await that.uploadImgSingle(files[i]));
        }
        console.log(waitUploadArr, 'waitUploadArr');
        // TODO: 这里未被执行
        // await Promise.all(waitUploadArr, (result) => {
        //   console.log(123, result);
        // });
        Promise.all(waitUploadArr).then(result => {
          console.log(result, 'Promise.all 方法当中进行上传');
        }).catch(err => {
          console.log(err, '所有图片当中有出现了错误');
        })
      }
    })
  }

  uploadImgSingle = (file) => {
    return new Promise((resolve, reject) => {
      Taro.uploadFile({
        url: 'http://localhost:5000/pins/upload',
        filePath: file.path,
        name: 'file',
        formData: {
          'user': 'test'
        },
        success: (data) => {
          try {
            const result = JSON.parse(data.data);
            console.log(result);
            if (result.code === 200 && result.data && result.data.imgUrl) {
              const resFiles = this.state.tempFiles.filter(tempFile => file.path !== tempFile.path);
              this.setState({
                tempFiles: [
                  ...resFiles,
                  {
                    path: file.path,
                    size: file.size,
                    imgUrl: result.data.imgUrl
                  }
                ]
              }, () => {
                // TODO: 优化点： 这里的提示放在
                Taro.showToast({
                  title: `第${''}张图片上传成功`,
                  icon: 'success',
                  duration: 2000,
                });
                resolve(true)
              });
            } else {
              Taro.showToast({
                title: '上传失败，请重新选择图片',
                duration: 2000,
                icon: 'none',
              });
              console.log(this.state.tempFiles, 'that state');
              reject(false);
            }
          } catch (err) {
            reject(false)
            console.log(`返回数据格式错误 --- ${err}`);
          }
        }
      })
    });
  }

  handleRemoveUploadImg = (path) => {
    // 接受需要移除上传图片的路径
    const { tempFiles } = this.state;
    const extraFiles = tempFiles.filter(file => file.path !== path);
    this.setState({
      tempFiles: extraFiles
    });
  }

  /**
   * 定义绘制图片的方法
   *
   * @memberof Offer
   */
  drawImage = async () => {
    let ctx = Taro.createCanvasContext('cardCanvas');

    // 填充背景色
    let grd = ctx.createLinearGradient(0, 0, 1, 500)
    grd.addColorStop(0, '#1452d0');
    grd.addColorStop(0.5, '#FFF');
    ctx.setFillStyle(grd);
    ctx.fillRect(0, 0, 400, 500);

    // 绘制圆形头像
    let userInfo = Taro.getStorageSync('userInfo');
    let res = await Taro.downloadFile({
      url: userInfo.avatarUrl
    });

    ctx.save();
    ctx.beginPath();
    // ctx.arc(160, 86, 66, 0, Math.PI * 2, false)
    ctx.arc(160, 88, 66, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()
    ctx.stroke()
    ctx.translate(160, 88)
    ctx.drawImage(res.tempFilePath, -66, -66, 132, 132)
    ctx.restore()

    // 绘制文字
    ctx.save()
    ctx.setFontSize(20)
    ctx.setFillStyle('#FFF')
    ctx.fillText(userInfo.nickName, 100, 200)
    ctx.setFontSize(16)
    ctx.setFillStyle('black')
    ctx.fillText('已在胡哥有话说公众号打卡20天', 50, 240)
    ctx.restore()

    // 绘制二维码
    let qrcode = await Taro.downloadFile({
      url: 'https://upload-images.jianshu.io/upload_images/3091895-f0b4b900390aec73.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/258/format/webp.jpg'
    })
    ctx.drawImage(qrcode.tempFilePath, 70, 260, 180, 180)

    // 将以上绘画操作进行渲染
    ctx.draw()

  }

  /**
   * saveCard() 保存图片到本地
   */
  async saveCard() {
    // 将Canvas图片内容导出指定大小的图片
    let res = await Taro.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 400,
      height: 500,
      destWidth: 360,
      destHeight: 450,
      canvasId: 'cardCanvas',
      fileType: 'png'
    })
    let saveRes = await Taro.saveImageToPhotosAlbum({
      filePath: res.tempFilePath
    })
    console.log(saveRes);
    if (saveRes.errMsg === 'saveImageToPhotosAlbum:ok') {
      Taro.showModal({
        title: '图片保存成功',
        content: '图片成功保存到相册了，快去发朋友圈吧~',
        showCancel: false,
        confirmText: '确认'
      })
    } else {
      Taro.showModal({
        title: '图片保存失败',
        content: '请重新尝试!',
        showCancel: false,
        confirmText: '确认'
      })
    }
  }

  handleInputMsg = (evt, name) => {
    this.setState({
      [name]: evt.detail.value
    });
  }

  render() {
    const { pins_desc } = this.state;
    console.log(this.state.tempFiles)
    return (
      <View className='pins_publish'>
        <View className='pins_publish_wrapper'>
          <Textarea placeholderClass='publish_preview_opts-placeholder'
            className='publish_preview_opts_area'
            placeholder='据说在此许愿，已经入职的前辈们会助力offer哦'
            autoHeight
            value={pins_desc}
            onInput={(evt) => this.handleInputMsg(evt, 'pins_desc')}
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
        {
          this.state.isShowCanvas &&
          <View className='canvas-wrap'>
            <Canvas
              id='card-canvas'
              className='card-canvas'
              style='width: 320px; height: 450px'
              canvasId='cardCanvas'
            >
            </Canvas>
            <Button onClick={this.saveCard} className='btn-save' type='primary' size='mini'>保存到相册</Button>
          </View>
        }
        <Button className='btn publish_btn' size='default' type='default'
          onClick={this.handleSubmit}
        >
          立即发布
        </Button>
      </View>
    )
  }
}

export default PinsPublish;