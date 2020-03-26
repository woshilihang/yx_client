import Taro, { Component } from '@tarojs/taro';
import { View, Canvas, Button, Image } from '@tarojs/components';

import pageInit from '../../components/pageInit';
import { rootUrl } from '../../config';

import './index.less';
import FloatLayout from '../../components/BTLayout';

@pageInit()
class DEMO extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      qrCode: '',
      isOpened: true
    }
  }

  componentDidMount() {
  }

  config = {
    navigationBarTitleText: '小公社'
  }

  //分享
  onShareAppMessage() {
    return {
      title: 'this page shareMessage'
    }
  }

  /**
   * 
   * @param {String} img 公司图片
   * @param {String} company 公司名称
   * @param {String} info 公司口号
   * @param {String} title 公司标题
   * @param {String} city 岗位城市
   * @param {String} job 岗位类型
   * @param {String} type 岗位性质 - 实习、全职
   */
  async drawImg(evt, gotoPath = `${rootUrl}/job/detail?job_id=123456`, img = '', company = '阿里巴巴', info = '让天下没有难做的生意', title = '阿里高德实习生(产品)', city = '北京', job = '技术', type = '实习', email = 'lihang@alibaba-inc.com') {
    evt.stopPropagation();
    let ctx = Taro.createCanvasContext('cardCanvas')

    // let grd = ctx.createLinearGradient(0,0, 1, 500)
    // grd.addColorStop(0, '#1452d0')
    // grd.addColorStop(0.5, '#FFF')
    // ctx.setFillStyle(grd)
    // ctx.fillRect(0, 0, 375, 500)

    // 底图
    let resFile = await Taro.downloadFile({
      url: 'https://img12.360buyimg.com/ling/jfs/t1/98993/33/16338/14968/5e7993fbEd220f96e/910a40f1783e0c61.png'
    });

    ctx.drawImage(resFile.tempFilePath, 0, 0, 375, 500)

    // 岗位信息

    // TODO: 待增加岗位公司图标

    ctx.setFillStyle('#333')
    ctx.setFontSize(16)
    ctx.fillText(company, 128, 80)
    ctx.fillText(info, 128, 110)
    ctx.stroke()
    console.log(resFile, 'resFile --- ')

    ctx.setTextAlign('center') // 文字居中
    ctx.setFillStyle('#333')
    ctx.setFontSize(22)
    ctx.fillText(title, 375 / 2, 175)
    ctx.stroke()

    ctx.setTextAlign('center') // 文字居中
    ctx.setFillStyle('#333')
    ctx.setFontSize(16)
    ctx.fillText(city, 100, 205)
    ctx.fillText(job, 200, 205)
    ctx.fillText(type, 280, 205)
    ctx.stroke()

    ctx.setTextAlign('center') // 文字居中
    ctx.setFillStyle('#333')
    ctx.setFontSize(18)
    ctx.fillText('投递邮箱: ', 100, 248)
    ctx.stroke()

    ctx.setFillStyle('#333')
    ctx.setFontSize(16)
    ctx.fillText(email, 240, 248)
    ctx.stroke()

    ctx.setTextAlign('center') // 文字居中
    ctx.setFillStyle('#b2b2b2')
    ctx.setFontSize(16)
    ctx.fillText('进入小程序查看更多', 188, 278)
    ctx.stroke()

    // TODO: 待增加小程序链接码
    // const qrImgSize = 180
    // let gotoPathImg = await Taro.downloadFile({
    //   url: gotoPath
    // });
    // ctx.drawImage(qrImgSize.tempFilePath, (375 - gotoPathImg) / 2, 300, gotoPathImg, gotoPathImg)

    ctx.setFillStyle('#333')
    ctx.setFontSize(16)
    ctx.fillText(`${company}正在友享社区招聘实习生`, 188, 400)
    ctx.stroke()

    ctx.setTextAlign('center') // 文字居中
    ctx.setFillStyle('#b2b2b2')
    ctx.setFontSize(16)
    ctx.fillText('长按识别小程序码了解职位详情', 188, 430)
    ctx.stroke()
    const that = this;
    ctx.draw(true, () => {
      Taro.canvasToTempFilePath({
        canvasId: 'cardCanvas',
        success: (res) => {
          console.log('res canvasToTempFilePath ----', res);
          this.setState({
            qrCode: res.tempFilePath
          }, () => {
            console.log('qrcode ---', this.state.qrCode)
          })
          Taro.uploadFile({
            url: `${rootUrl}/pins/upload`,
            filePath: res.tempFilePath,
            name: 'file',
            formData: {
              'path': 'qrcode', // 指明存储资源路径
            },
            success: uploadRes => {
              // console.log('uploadRes ---', uploadRes);
              const uploadMsg = JSON.parse(uploadRes.data);
              console.log(uploadMsg, 'uploadMsg');
              that.setState({
                qrCode: `${rootUrl}${uploadMsg.data.imgUrl}`
              });
            }
          });
        }
      })
    })

  }

  onSavePhoto(e) {
    const qrCodePath = this.state.qrCode;
    const _this = this;
    e.stopPropagation();
    Taro.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          Taro.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              _this.downloadImgToAlbum(qrCodePath)
            },
            fail: () => {
              // _this.setState({

              // })
              console.log('显示授权失败');
            }
          })
        } else {
          // 已经授权
          _this.downloadImgToAlbum(qrCodePath);
        }
      }
    })
  }

  downloadImgToAlbum(qrCodePath) {
    Taro.showToast({
      title: '正在保存，请稍等',
      icon: 'none',
      duration: 2000
    })
    //下载图片
    this.downloadHttpImg(qrCodePath).then((res) => {
      this.sharePosteCanvas(res)
    })
  }

  downloadHttpImg = (httpImg) => {
    return new Promise(((resolve) => {
      Taro.downloadFile({
        url: httpImg,
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.tempFilePath)
          } else {
            Taro.showToast({
              title: '图片下载失败！',
              icon: 'none',
              duration: 1000
            })
          }
        },
        fail: () => {
          Taro.showToast({
            title: '图片下载失败！',
            icon: 'none',
            duration: 1000
          })
        }
      })
    }))
  }

  sharePosteCanvas = (imgUrl) => {
    Taro.saveImageToPhotosAlbum({
      filePath: imgUrl,
      success() {
        Taro.showToast({
          title: '图片已保存到相册',
          icon: 'none',
          duration: 1000
        })
      },
      fail() {
        Taro.showToast({
          title: '图片保存失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
  }

  handleOnCloseFloatLayout = () => {
    this.setState({
      isOpened: false
    })
  }

  render() {
    return (
      <View className='my'>
        {
          this.state.qrCode && (
            <Image className='img_wrapper'
              onLongPress={this.onSavePhoto.bind(this)}
              src={this.state.qrCode}
              onClick={
                () => {
                  this.setState({
                    qrCode: ''
                  })
                }
              }
            />
          )
        }
        <Button onClick={this.drawImg.bind(this)}>导出为图片</Button>
        {
          !this.state.qrCode && <Canvas
            id='card-canvas'
            className='card-canvas'
            style='width: 375px; height: 500px'
            canvasId='cardCanvas'
          ></Canvas>
        }
        <Button onClick={this.saveCard} className='btn-save' type='primary'
          size='mini'
        >保存到相册</Button>
        <FloatLayout
          wrapperCls='exportImgLayout'
          title='title'
          isOpened={this.state.isOpened}
        // children={<View>111</View>}
          onClose={this.handleOnCloseFloatLayout}
        />
      </View>
    )
  }
}

export default DEMO;