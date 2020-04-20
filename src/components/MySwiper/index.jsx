import Taro, { Component } from '@tarojs/taro';
import { Swiper, SwiperItem, Image } from '@tarojs/components';
import PropTypes from 'prop-types';

import './index.less'

class MySwiper extends Component {
  static propTypes = {
    banner: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { banner } = this.props;
    return (
      <Swiper
        className='swiper-container'
        circular
        indicatorDots
        indicatorColor='#999'
        indicatorActiveColor='#bf708f'
        autoplay
      >
        {banner.map((item, index) => (
          <SwiperItem key={index}>
            <Image className='swiper-img' mode='widthFix' src={item.image_src}></Image>
          </SwiperItem>
        ))}
      </Swiper>
    )
  }
}

export default MySwiper;
