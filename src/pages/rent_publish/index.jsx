import Taro, { Component } from '@tarojs/taro';
import { View, Map, Input, Text, Image, Textarea, Radio, Switch, RadioGroup, Label, Button } from '@tarojs/components';
import { AtActionSheet, AtActionSheetItem } from 'taro-ui';

import { MaxRentUploadImg, rootUrl } from '../../config';
import { OPTS_CITY } from '../../constants';

import '../../public/styles/common.less'
import './index.less'

class RentPublish extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      origin: this.$router.params.origin || 'findHouse',
      longitude: '', // 经度
      latitude: '', // 纬度
      markers: [],
      markerTaped: {},
      markerTapedId: '',
      tempFiles: [], // 临时上传文件 {path: '', size: ''}
      rent_desc: '', // 租房描述
      isOpened: false, // 是否显示
      price: '', // 租房意向价格
      wx: '', // 微信号
      gender: '', // 性别
      canShortRent: false, // 是否接受短租
    }
  }

  componentDidMount() {
    this.mapCtx = Taro.createMapContext('container') //container是地图显示模块id

    let _this = this
    Taro.getLocation({
      type: 'wgs84',
      success(res) {
        _this.setState({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
    //移动到定位到的位置
    this.mapCtx.moveToLocation()
  }

  buildMarkers = (lat, long) => {
    let result = [];
    for (let i = 0; i < 10; i++) {
      result.push({
        latitude: lat + parseFloat((Math.random().toFixed(2) * 0.01).toFixed(5)),
        longitude: long + parseFloat((Math.random().toFixed(2) * 0.01).toFixed(5)),
        width: '40px',
        height: '44px',
        id: Math.random().toFixed(5) * 100000
      });
    }
    console.log('result --- buildMarkers --', result);
    this.setState({
      markers: result
    })
  }

  markertapHandler = function (res) {
    let { markerId } = res
    this.setState({ markerTapedId: markerId })
  }

  config = {
    // TODO: 晚点同步
    navigationBarTitleText: `${this.state.origin || '发布'}·友享社区`
  }

  handleSearchClick() {
    Taro.chooseLocation({
      success: res => {
        console.log(res, 'res ---chooseLocation')
        const {
          address,
          latitude,
          longitude,
          name,
        } = res;
        this.setState({
          address,
          latitude,
          longitude,
          name,
        });
      },
      fail: () => {
        // console.log(err, 'chooseLocation err ---')
        Taro.showToast({
          title: '你取消了地址搜索操作',
          icon: 'none'
        });
      }
    })
  }

  uploadImgSingle = (file) => {
    return new Promise((resolve, reject) => {
      Taro.uploadFile({
        url: `${rootUrl}/pins/upload`,
        filePath: file.path,
        name: 'file',
        formData: {
          'path': 'rent_img', // 指明存储资源路径
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
    const { tempFiles } = this.state;
    const extraFiles = tempFiles.filter(file => file.path !== path);
    this.setState({
      tempFiles: extraFiles
    });
  }

  handleUploadImg = () => {
    const that = this;
    Taro.chooseImage({
      count: MaxRentUploadImg,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: async function (res) {
        console.log('选择图片 ---', res);
        const files = res.tempFiles;
        let waitUploadArr = [];
        for (let i = 0, len = files.length; i < len; i++) {
          waitUploadArr.push(await that.uploadImgSingle(files[i]));
        }
        Promise.all(waitUploadArr).then(result => {
          console.log(result, 'Promise.all 方法当中进行上传');
        }).catch(err => {
          console.log(err, '所有图片当中有出现了错误');
        })
      }
    })
  }

  matchPlaceHolderTxt = (origin) => {
    const keyMapTxt = {
      'findHouse': '描述求租开始时间和期限，期望主卧次卧，几人间，本人工作地点，毕业学校，年龄和爱好等情况',
      'findFriends': '',
    }

    return keyMapTxt[origin] || ''
  }

  handleAtActionSheetClick(city) {
    this.setState({
      isOpened: false,
      currCity: city
    })
  }

  handleCancel = () => {
    this.setState({
      isOpened: false
    })
  }

  handleContentInput(name, evt) {
    console.log('handleContentInput ', name, evt)
    this.setState({
      [name]: evt.detail.value
    })
  }

  handleSubmit() {
    // TODO: 发布租房信息
  }

  render() {
    const { latitude, longitude, markers, rent_desc, origin, isOpened, currCity, gender } = this.state;
    console.log(gender, 'gender ---')
    let placeholderTxt = this.matchPlaceHolderTxt(origin)
    return (
      <View className='rent_publish'>
        <View className='header_search'>
          <Input
            placeholderClass='header_search_input-placeholder'
            className='header_search_input' confirm-type='search'
            // onInput={this.handleSearchInput}
            // onConfirm={this.handleConfirmInput}
            onClick={this.handleSearchClick.bind(this)}
            placeholder='搜索输入...'
            value={this.state.name}
          />
          <Text className='header_msg'>
            搜索
          </Text>
        </View>
        <View className='rent_map_container'>
          <Map
            className='rent_map'
            id='container'
            longitude={longitude}
            latitude={latitude}
            showLocation
            showCompass
            showScale
            scale={14}
            markers={markers}
            includePoints
            includePadding
            onmarkertap={this.markertapHandler}
          />
        </View>

        <View className='rent_publish_preview'>
          {
            this.state.tempFiles.map(file => (
              <Image src={file.path}
                className='rent_publish_preview_img'
                key={file.path}
                onClick={() => this.handleRemoveUploadImg(file.path)}
              />
            ))
          }
          {
            this.state.tempFiles.length !== MaxRentUploadImg && (
              <View className='rent_publish_get' onClick={this.handleUploadImg}>
                <Text className='rent_publish_get_extra'>(选填,可放本人照片)</Text>
              </View>
            )
          }
        </View>

        <Textarea placeholderClass='publish_preview_opts-placeholder'
          className='publish_preview_opts_area'
          placeholder={placeholderTxt}
          autoHeight
          value={rent_desc}
          maxlength={-1}
          onInput={(evt) => this.handleInputMsg(evt, 'pins_desc')}
        />

        <View className='rent_info_list'>
          <View className='rent_info_list_item'>
            <Text className='rent_info_list_item_label'>城市: </Text>
            <Text className='rent_info_list_item_content'
              onClick={() => {
                this.setState({
                  isOpened: true
                })
              }}
            >
              {currCity.name ? currCity.name : '选择 >'}
            </Text>
          </View>
          <View className='rent_info_list_item'>
            <Text className='rent_info_list_item_label'>意向价格: </Text>
            <Input className='rent_info_list_item_content'
              onInput={this.handleContentInput.bind(this, 'price')}
            />
            <Text>￥/月</Text>
          </View>

          <View className='rent_info_list_item'>
            {
              origin == 'findHouse' ? (
                <Text className='rent_info_list_item_label'>本人性别: </Text>
              ) : (
                  <Text className='rent_info_list_item_label'>要求性别: </Text>
                )
            }
            <RadioGroup className='rent_info_list_item_content'
              onChange={this.handleContentInput.bind(this, 'gender')}
            >
              <Label style={{ marginRight: '10px' }}>
                <Radio
                  style={{ transform: 'scale(0.8);' }}
                  value='男'
                />
                男
              </Label>
              <Label>
                <Radio
                  style={{ transform: 'scale(0.8)' }}
                  value='女'
                />
                女
              </Label>
            </RadioGroup>
          </View>

          <View className='rent_info_list_item'>
            <Text className='rent_info_list_item_label'>是否接受短租(三个月内): </Text>
            <Switch className='rent_info_list_item_content'
              style={{ transform: 'scale(0.8);', marginRight: '-8%' }}
              onChange={this.handleContentInput.bind(this, 'canShortRent')}
            />
          </View>
          <View className='rent_info_list_item'>
            <Text className='rent_info_list_item_label'>微信号: </Text>
            <Input className='rent_info_list_item_content'
              onInput={this.handleContentInput.bind(this, 'wx')}
              placeholder='请输入'
            />
          </View>
        </View>

        <Button className='btn publish_btn' size='default' type='default'
          onClick={this.handleSubmit.bind(this)}
        >
          立即发布
        </Button>
        <AtActionSheet className='self_atactionsheet' isOpened={isOpened}
          cancelText='取消'
          onCancel={this.handleCancel}
        >
          {
            OPTS_CITY.map(city => (
              <AtActionSheetItem onClick={this.handleAtActionSheetClick.bind(this, city)} key={city.id}>
                {city.name}
              </AtActionSheetItem>
            ))
          }
        </AtActionSheet>
      </View>
    )
  }
}

export default RentPublish;