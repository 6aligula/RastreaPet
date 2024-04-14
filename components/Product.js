// Product.js
import React from 'react';
import { View, Text } from 'react-native';
import Rating from '../components/Rating';
import styles from './styles/ProductStyle';
import CarouselComponent from './Carousel';
import { useColorSchemeContext } from '../ColorSchemeContext';

const Product = ({ product }) => {
  const { stylesGlobal } = useColorSchemeContext();
  return (
    <View style={[styles.row, stylesGlobal.background]}>

      {product.images && product.images.length ? (
        <CarouselComponent images={product.images.map(img => img.image)} />
      ) : (
        <Text>No Images Available</Text>
      )}

      <Text style={[styles.title, stylesGlobal.text]}>{product.name}</Text>
      <Rating value={product.rating} />
      <Text style={stylesGlobal.text}>{`${product.numReviews} reviews`}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};
export default Product;