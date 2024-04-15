import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { listProductDetails } from '../store/actions/productActions';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import styles from './styles/DetailProductStyle';
import CarouselComponent from '../components/Carousel';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';
import { useColorSchemeContext } from '../ColorSchemeContext';
import NetInfo from "@react-native-community/netinfo";


function DetailProductScreen({ navigation, route }) {
  const [isConnected, setIsConnected] = useState(true);
  const { stylesGlobal } = useColorSchemeContext();

  useAndroidBackButton(navigation);

  const { productId } = route.params;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    const checkConnectivityAndLoadData = async () => {
      const state = await NetInfo.fetch();
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        dispatch(listProductDetails(productId));
        //console.log("Conectado a internet?", state.isConnected);
      }
      
    };
    checkConnectivityAndLoadData();
  }, [dispatch, productId]);

  return (
    <SafeAreaView style={[stylesGlobal.background, styles.safeAreaContainer]}>
      {!isConnected && <Message variant="danger">No hay conexión a internet.</Message>}
      <ScrollView>
        {loading ? (
          <Loader />
        ) : error ? (
          <>
          {product && product.length > 0 && (
            <FlatList
              data={product}
              keyExtractor={(item) => item._id.toString()}
              renderItem={renderItem}
              ListHeaderComponent={CombinedHeader}
              numColumns={1}
            />
          )}

        </>
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