import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, RichText, Canvas } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import MyFooter from '../../components/Footer/index';
import pageInit from '../../components/pageInit';
import { initAppAuth } from '../../actions/init';

import './index.less'
import { replaceSpaceToBr, transLangToName, drawImage } from '../../utils/common';
import { OPTS_CITY, OPTS_JOB } from '../../constants';
import { fetchJobDetail } from '../../client';
import { rootUrl } from '../../config';

@connect(({ init, }) => ({ init }), (dispatch) => ({
  onInitAppAuth(payload) {
    dispatch(initAppAuth(payload))
  }
}))
@pageInit()
class Job_Detail extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      canShare: true,
      job_type: '',
      job_city: [],
      job_email: '',
      job_origin: '',
      job_desc: '',
      job_isOffical: false,
      job_company: {},
      job_name: '',
      qrCode: ''
    };
  }


  async componentDidMount() {
    console.log(this.$router)
    const { jobId = '5e74ceb55f28640daa7ebd9e' } = this.$router.params;

    const res = await fetchJobDetail({
      job_id: jobId
    });
    console.log('岗位详情数据res ---', res)
    const {
      job_type,
      job_city,
      job_email,
      job_origin,
      job_desc,
      job_isOffical,
      job_company,
      job_name,
      job_id,
    } = res;
    this.setState({
      job_type,
      job_city,
      job_email,
      job_origin,
      job_desc,
      job_isOffical,
      job_company,
      job_name,
      job_id
    });
  }

  config = {
    navigationBarTitleText: '职位详情'
  }

  //分享
  onShareAppMessage() {
    const { job_company = {}, job_id } = this.state;
    return {
      title: `急招！${job_company.companyName || '公司'}在友享社区招聘实习，点击速看！！`,
      path: `/pages/job_detail/index?jobId=${job_id}&isShare=true`,
      // imgUrl: '', // 自定义转发的图片
      success: function (res) {
        console.log(res, 'res --- onshareAppmESSAGE')
        Taro.showToast({
          title: '转发成功',
          icon: 'none'
        });
      }
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
  async drawImg(evt, gotoPath = `${rootUrl}/job/detail?job_id=123456`, img = '') {
    const { job_company = {}, job_name: title, job_city, job_type: job, job_type: type, job_email: email} = this.state;
    let city = transLangToName(OPTS_CITY, job_city).join('、')
    const { companyName: company, keyword: info, imgUrl } = job_company;
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
    ctx.drawImage(imgUrl, 30 ,40 , 200 ,200)
    ctx.draw();
    ctx.stroke()

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
  render() {
    const { job_type,
      job_city = [],
      job_email,
      job_origin,
      job_desc,
      job_isOffical,
      job_company,
      job_id,
      job_name
    } = this.state;
    return (
      <View className='job_detail'>
        <View className='job_detail_wrapper'>
          <View className='job_detail_header'>
            <Image className='job_detail_img' src={job_company.imgUrl} />
            <View className='job_detail_title'>
              {job_name}
            </View>
            <View className='job_detail_company' onClick={
              () => this.props.onInitAppAuth(false)
            }
            >
              {job_company.companyName}
            </View>
            <View className='job_detail_msg'>
              <Text className='location'
                onClick={drawImage}
              >{transLangToName(OPTS_CITY, job_city).join('、')}</Text>
              <Text className='jobs'>{transLangToName(OPTS_JOB, job_type)}</Text>
              <Text className='origin'>{job_origin}</Text>
            </View>
          </View>
          <View className='job_detail_flag'>
            <View className='msg'>
              <Text className='msg_label'>公司名称</Text>
              <Text className='msg_txt'>{job_company.companyName}</Text>
            </View>
            <View className='msg'>
              <Text className='msg_label'>公司口号</Text>
              <Text className='msg_txt'>{job_company.keyword}</Text>
            </View>
          </View>

          <View className='job_detail_preview'>
            <View className='job_detail_preview_title'>
              职位描述
          </View>
            <View className='job_detail_preview_content'>
              <RichText nodes={(replaceSpaceToBr(job_desc))} />
            </View>

            <View className='job_detail_preview_title'>
              投递邮箱
          </View>
            <View className='job_detail_preview_content'>
              <View className='msg'>
                <Text>投递邮箱</Text>
                <Text>{job_email}</Text>
              </View>
              <View className='msg'>
                <Text>简历名称</Text>
                <Text>姓名+岗位+学校+实习周期+友享社区</Text>
              </View>
            </View>
            <View className='job_detail_preview_title'>
              工作城市
            </View>
            <View className='job_detail_preview_content'>
              {transLangToName(OPTS_CITY, job_city).join('、')}
            </View>
            {
              job_isOffical && (
                <View>
                  <View className='job_detail_preview_title'>
                    转正机会
                </View>
                  <View className='job_detail_preview_content'>
                    实习期间表现良好能够提前转正
                </View>
                </View>
              )
            }
          </View>
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
          {
            !this.state.qrCode && <Canvas
              id='card-canvas'
              className='card-canvas'
              style='width: 375px; height: 500px'
              canvasId='cardCanvas'
            ></Canvas>
          }
        </View>
        <MyFooter email={job_email}
          content_id={job_id}
          onDrawImg={this.drawImg.bind(this)}
        />
      </View>
    )
  }
}

export default Job_Detail;