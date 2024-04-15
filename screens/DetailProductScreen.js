import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ScrollView, Button, SafeAreaView } from 'react-native';
import { listProductDetails } from '../store/actions/productActions';
//import { addToCart } from '../store/actions/cartActions';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import styles from './styles/DetailProductStyle';
import CarouselComponent from '../components/Carousel';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';
import { useColorSchemeContext } from '../ColorSchemeContext';

function DetailProductScreen({ navigation, route }) {
  const { stylesGlobal } = useColorSchemeContext();

  useAndroidBackButton(navigation);

  const { productId } = route.params;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  return (
    <SafeAreaView style={[stylesGlobal.background, styles.safeAreaContainer]}>
      <ScrollView>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <View style={styles.container}>
            <Text style={[stylesGlobal.text, styles.title]}>Detalles de la mascota</Text>

            {product.images && product.images.length ? (
              <CarouselComponent images={product.images.map(img => img.image)} />
            ) : (
              <Text>No Images Available</Text>
            )}

            <Text style={[stylesGlobal.text ,styles.productName]}>{product.name}</Text>
            <View style={styles.rating}>
              <Rating value={product.rating} />
              <Text style={styles.rating}>{`${product.numReviews} Pistas`}</Text>
            </View>
            <Text style={styles.productPrice}>Recompensa: €{product.price}</Text>
            <Text style={[stylesGlobal.text, styles.productDescription]}>Descripción: {product.description}</Text>

          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailProductScreen;