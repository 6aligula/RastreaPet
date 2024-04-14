import React from 'react';
import { View, Text, Image } from 'react-native';
import Rating from '../components/Rating';
import styles from './styles/ProductStyle';
import { useColorSchemeContext } from '../ColorSchemeContext';

const Product = ({ product }) => {
  const { stylesGlobal } = useColorSchemeContext();
  return (
    <View style={[styles.row, stylesGlobal.background]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>

      <Text style={[styles.title, stylesGlobal.text]}>{product.name}</Text>
      <Rating value={product.rating} />
      <Text style={stylesGlobal.text}>{`${product.numReviews} reviews`}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};
export default Product;