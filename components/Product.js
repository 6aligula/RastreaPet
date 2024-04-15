// Product.js
import React from 'react';
import { View, Text, TouchableOpacity,  } from 'react-native';
import Rating from '../components/Rating';
import styles from './styles/ProductStyle';
import CarouselComponent from './Carousel';
import { useColorSchemeContext } from '../ColorSchemeContext';

const Product = ({ product, onDetailsPress }) => {
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
      <Text style={stylesGlobal.text}>{`${product.numReviews} Pista`}</Text>
      <Text style={styles.price}>${product.price}</Text>

      <TouchableOpacity onPress={onDetailsPress} style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Ver detalles</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Product;