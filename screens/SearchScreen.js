import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/core';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import styles from './styles/SearchStyles';
import { listProducts } from '../store/actions/productActions';
import { useColorSchemeContext } from '../ColorSchemeContext';
import useAndroidBackButton from '../myHooks/useAndroidBackButton'



const SearchScreen = ({ navigation, route }) => {

    useAndroidBackButton(navigation, () => {
        navigation.navigate('HomeScreen');
    });
    const { stylesGlobal } = useColorSchemeContext();
    const { searchKeyword } = route.params;
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { error, loading, products, page } = productList;

    useAndroidBackButton(navigation);
    useFocusEffect(
        React.useCallback(() => {
            dispatch(listProducts(searchKeyword, page));
        }, [dispatch])
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('DetailProductScreen', { productId: item._id })}>
            <Product product={item} />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, stylesGlobal.background]}>
            <Text style={[styles.title, stylesGlobal.text]}>Productos encontrados</Text>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                products && (
                    products.length > 0 ? (
                        <FlatList
                            data={products}
                            renderItem={renderItem}
                            keyExtractor={(item) => item._id}
                            contentContainerStyle={styles.productList}
                            numColumns={2}
                        />
                    ) : (
                        <Message variant="danger">No se encontró ningún producto relacionado con su busqueda</Message>
                    )
                )
            )}
        </View>
    );
};

export default SearchScreen;