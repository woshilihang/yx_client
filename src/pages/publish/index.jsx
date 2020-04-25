/* eslint-disable react/jsx-curly-brace-presence */
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Switch, Button, Textarea } from '@tarojs/components';
import { OPTS_CITY, OPTS_ORIGIN } from '../../constants';

import '../../public/styles/common.less'
import './index.less'
import { getSimpleIsBelone, isNullObj, removeOfArr } from '../../utils/common';
import { fetchJobpublish } from '../../client';

const optsJobs_list = [
  {
    id: 1,
    name: '产品',
    job: 'product'
  },
  {
    id: 2,
    name: '运营',
    job: 'business'
  },
  {
    id: 3,
    name: '技术',
    job: 'skill'
  },
  {
    id: 4,
    name: '职能',
    job: 'operate'
  },
  {
    id: 5,
    name: '市场',
    job: 'market'
  },
  {
    id: 6,
    name: '设计',
    job: 'design'
  },
  {
    id: 7,
    name: '金融',
    job: 'finance'
  },
]

class Publish extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      job_type: {}, // 岗位类型
      job_city: [],
      job_name: '',
      job_email: '',
      job_origin: {},
      job_desc: '',
      job_isOffical: false, // 是否可转正
    }
  }

  componentDidMount() {
  }

  config = {
    navigationBarTitleText: '小公社'
  }

  handleChangeJobCity = (jobs) => {
    const { lang } = jobs;
    if (!lang) return;
    const { job_city } = this.state;
    const isExist = getSimpleIsBelone(job_city, lang);
    this.setState({
      job_city: isExist ? removeOfArr(job_city, lang) : [...job_city, lang],
    });
  }

  handleChangeVal = (name, val) => {
    this.setState({
      [name]: val
    });
  }

  handleInputMsg = (evt, name) => {
    this.setState({
      [name]: evt.detail.value
    })
  }
  handleSwitchOffical = () => {
    console.log(this.state.job_isOffical);
    this.setState({
      job_isOffical: !this.state.job_isOffical
    });
  }

  handleSubmit = async () => {
    // textarea里面的换行符需要保留
    // TODO: this.state.job_desc.replace(/[\r\n]/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
    const { companyName } = this.$router.params;
    const { job_isOffical, job_type, job_city, job_origin, job_email, job_desc, job_name } = this.state;
    const params = {
      job_type: job_type.job,
      job_city,
      job_name,
      job_email,
      job_origin: job_origin.name,
      job_desc,
      job_isOffical,
      job_company: companyName
    };
    console.log(params);

    // 空字符输入形式
    const validVal = {
      job_name,
      job_email,
      job_desc,
    };
    let isEmptyValArr =  Object.values(validVal).filter(val => val === '');
    // 有值既有空的情况
    console.log(isEmptyValArr, 'isEmptyValArr');
    if(isNullObj(job_origin) || isNullObj(job_type) || job_city.length === 0 || isEmptyValArr.length !== 0) {
      Taro.showToast({
        title: '请完善相关信息',
        icon: 'none',
      });
      return ;
    }

    const res = await fetchJobpublish(params);
    console.log('发布内推信息res ---', res);
    Taro.switchTab({
      url: '/pages/index/index',
    });
  }

  render() {
    const { job_isOffical, job_type, job_city, job_origin, job_email, job_desc, job_name } = this.state;
    const { companyName } = this.$router.params;
    console.log(this.state.job_desc.replace(/[\r\n]/g, '<br/>'), 'jobdesc');
    console.log(this.$router)
    return (
      <View className='publish'>
        <View className='publish_title'>
          <Text className='publish_title_company'>
            {companyName}
          </Text>
          <Text className='publish_reconfirm'
            onClick={
             () => {
              Taro.navigateTo({
                url: `/pages/my_auth/index`
              })
             }
            }
          >
            重新认证 &gt;&gt;&gt;
          </Text>
        </View>
        <View className='publish_preview'>
          <View className='publish_preview_content type'>
            岗位类别
            {
              !isNullObj(job_type) && <Text className='publish_preview_content_txt'
                onClick={() => this.handleChangeVal('job_type', {})}
              >· {job_type.name}</Text>
            }
          </View>
          {
            isNullObj(job_type) && (
              <View className='publish_preview_opts'>
                {
                  optsJobs_list.map(item => (
                    <View className={`publish_preview_opts_item`}
                      key={item.id}
                      onClick={this.handleChangeVal.bind(this, 'job_type', item)}
                    >
                      {
                        item.name
                      }
                    </View>
                  ))
                }
              </View>
            )
          }
        </View>
        {/* 工作城市 */}
        <View className='publish_preview'>
          <View className='publish_preview_content city'>
            工作城市
          </View>
          <View className='publish_preview_opts'>
            {
              OPTS_CITY.map(item => (
                <View className={`publish_preview_opts_item ${getSimpleIsBelone(job_city, item.lang) ? 'active_job_city' : ''}`}
                  key={item.id}
                  onClick={() => this.handleChangeJobCity(item)}
                >
                  {
                    item.name
                  }
                </View>
              ))
            }
          </View>
        </View>

        <View className='publish_preview'>
          <View className='publish_preview_content name'>
            岗位名称
          </View>
          <View className='publish_preview_opts'>
            <Input
              placeholderClass='publish_preview_opts-placeholder'
              className='publish_preview_opts_input'
              placeholder='如： 产品经理实习生'
              value={job_name}
              // onChange={this.handleInputMsg}
              onInput={(evt) => this.handleInputMsg(evt, 'job_name')}
            />
          </View>
        </View>

        <View className='publish_preview'>
          <View className='publish_preview_content name'>
            投递邮箱 <Text className='sp'>
              (非公司邮箱, 可能被下架)
            </Text>
          </View>
          <View className='publish_preview_opts'>
            <Input
              placeholderClass='publish_preview_opts-placeholder'
              className='publish_preview_opts_input'
              placeholder=''
              value={job_email}
              onInput={(evt) => this.handleInputMsg(evt, 'job_email')}
            />
          </View>
        </View>

        {/* 岗位来源 */}
        <View className='publish_preview'>
          <View className='publish_preview_content city'>
            岗位来源
            {
              !isNullObj(job_origin) && <Text className='publish_preview_content_txt'
                onClick={() => this.handleChangeVal('job_origin', {})}
              >· {job_origin.name}</Text>
            }
          </View>
          {
            isNullObj(job_origin) && (
              <View className='publish_preview_opts'>
                {
                  OPTS_ORIGIN.map(item => (
                    <View className='publish_preview_opts_item' key={item.id}
                      onClick={() => this.handleChangeVal('job_origin', item)}
                    >
                      {
                        item.name
                      }
                    </View>
                  ))
                }
              </View>
            )
          }
        </View>

        {/* 岗位描述 */}
        <View className='publish_preview'>
          <View className='publish_preview_content name'>
            岗位描述
          </View>
          <View className='publish_preview_opts'>
            <Textarea placeholderClass='publish_preview_opts-placeholder'
              className='publish_preview_opts_area'
              placeholder='工作概要、申请要求及福利等'
              autoHeight
              maxlength={-1}
              value={job_desc}
              onInput={(evt) => this.handleInputMsg(evt, 'job_desc')}
            />
          </View>
        </View>

        {/* 可转正 */}
        <View className='publish_preview mb40'>
          <Text className='publish_preview_txt'>可转正</Text>
          <Switch
            className='publish_preview_switch'
            color='#333'
            checked={job_isOffical}
            onClick={this.handleSwitchOffical}
          />
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

export default Publish;