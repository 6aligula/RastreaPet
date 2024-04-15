//HomeScreen.js
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { listProducts } from '../store/actions/productActions';
import SearchBox from '../components/SearchBox'
import styles from './styles/HomeStyles';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';
import { BackHandler } from 'react-native';
import { useColorSchemeContext } from '../ColorSchemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from "@react-native-community/netinfo";

const HomeScreen = ({ navigation }) => {
  useAndroidBackButton(navigation, () => {
    BackHandler.exitApp();
  });
  const { stylesGlobal } = useColorSchemeContext();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages, _persist } = productList;

  // // Efecto para manejar la rehidratación
  // useEffect(() => {
  //   if (_persist && _persist.rehydrated) {
  //     // Los datos han sido rehidratados, puedes decidir recargar o solo re-renderizar
  //     console.log("Datos rehidratados, verificando productos...");
  //     if (!products || products.length === 0) {
  //       console.log("No hay productos cargados post-rehidratación, recargando...");
  //       dispatch(listProducts('', 1)); // Intenta recargar los datos si están vacíos
  //     }
  //   }
  // }, [_persist]);

  useFocusEffect(
    React.useCallback(() => {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          dispatch(listProducts('', 1));
          console.log("Conectado a internet?", state.isConnected);
        }
      });
    }, [dispatch])
  );

  const renderItem = ({ item }) => (
    <Product product={item} onDetailsPress={() => navigation.navigate('DetailProductScreen', { productId: item._id })} />
  );


  const CombinedHeader = () => (
    <View style={styles.container}>
      <SearchBox navigation={navigation} />
      <Text style={[styles.title, stylesGlobal.text]}>Últimas mascotas perdidas</Text>
    </View>
  );
  
  // console.log("Productos: ", products);
  // console.log("Error: ", error);

  return (
    <SafeAreaView style={[styles.safeArea, stylesGlobal.background]}>
      {loading ? (
        <Loader />
      ) : error ? (
        <>
          <Message variant="danger">{error}</Message>
          {products && products.length > 0 && (
            <FlatList
              data={products}
              keyExtractor={(item) => item._id.toString()}
              renderItem={renderItem}
              ListHeaderComponent={CombinedHeader}
              numColumns={1}
            />
          )}
          <TouchableOpacity onPress={() => dispatch(listProducts('', 1))}>
            <Text style={styles.retryButtonText}>Intentar de nuevo</Text>
          </TouchableOpacity>
        </>
      ) : (
        products && (
          <FlatList
            data={products}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderItem}
            ListHeaderComponent={CombinedHeader}
            numColumns={1}
          />
        )
      )}
      {!loading && products && products.length > 0 && (
        <Paginate
          pages={pages}
          page={page}
          onPageChange={(selectedPage) => dispatch(listProducts("", selectedPage))}
        />
      )}
    </SafeAreaView>
  );
};
export default HomeScreen;
