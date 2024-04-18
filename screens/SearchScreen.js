import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/core';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Pet from '../components/Pet';
import Loader from '../components/Loader';
import Message from '../components/Message';
import styles from './styles/SearchStyles';
import { listPets } from '../store/actions/petActions';
import { useColorSchemeContext } from '../ColorSchemeContext';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';

const SearchScreen = ({ navigation, route }) => {
    useAndroidBackButton(navigation, () => {
        navigation.navigate('HomeScreen');
    });
    const { stylesGlobal } = useColorSchemeContext();
    const { searchKeyword } = route.params;
    const dispatch = useDispatch();
    const petList = useSelector((state) => state.petList);
    const { error, loading, pets, page, pages } = petList;

    useFocusEffect(
        React.useCallback(() => {
            dispatch(listPets(searchKeyword, page, false));
        }, [dispatch, searchKeyword])
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('DetailPetScreen', { petId: item._id })}>
            <Pet pet={item} />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, stylesGlobal.background]}>
            <Text style={[styles.title, stylesGlobal.text]}>Mascotas encontradas</Text>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                pets && (
                    pets.length > 0 ? (
                        <FlatList
                            data={pets}
                            renderItem={renderItem}
                            keyExtractor={(item) => item._id.toString()}
                            contentContainerStyle={styles.petList}
                            numColumns={2}
                        />
                    ) : (
                        <Message variant="danger">No se encontró ninguna mascota relacionada con su búsqueda</Message>
                    )
                )
            )}
        </View>
    );
};

export default SearchScreen;
