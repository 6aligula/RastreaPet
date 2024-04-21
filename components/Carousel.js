import React from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './styles/CarouselStyles';

const CarouselComponent = ({ images }) => {
  return (
    <Swiper
      height={styles.imageContainer.height}
      loop={true}
      showsPagination={true}
      showsButtons={true}
      autoplay={false}
    >
      {images.map((img, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image source={{ uri: img }} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};


export default CarouselComponent;
