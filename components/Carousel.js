// CarouselComponent.js
import React from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './styles/CarouselStyles';

const CarouselComponent = ({ images }) => {
  return (
    <Swiper
      height={styles.imageContainer.height} // Configuramos el alto del swiper
      loop={true} // Si deseas que el carrusel haga loop
      showsPagination={true} // Para mostrar la paginación (los puntos abajo)
      showsButtons={true} // Opcional: mostrar botones para navegar
      autoplay={false} // Opcional: para que el carrusel avance automáticamente
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
