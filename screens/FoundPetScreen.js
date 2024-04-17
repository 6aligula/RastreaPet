//FounPetScreen.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import Pet from '../components/Pet';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { listPets } from '../store/actions/petActions';
import SearchBox from '../components/SearchBox'
import styles from './styles/HomeStyles';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';
import { BackHandler } from 'react-native';
import { useColorSchemeContext } from '../ColorSchemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from "@react-native-community/netinfo";
import FloatingButton from '../components/FloatingButton';

const FounPetScreen = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState(true);

  useAndroidBackButton(navigation, () => {
    BackHandler.exitApp();
  });
  const { stylesGlobal } = useColorSchemeContext();

  const dispatch = useDispatch();
  const petList = useSelector((state) => state.petList);
  const { error, loading, pets, page, pages } = petList;

  useFocusEffect(
    React.useCallback(() => {
      const checkConnectivityAndLoadData = async () => {
        const state = await NetInfo.fetch();
        setIsConnected(state.isConnected);
        if (state.isConnected) {
          dispatch(listPets('', 1, false));
          console.log("peticion enviada al server");
        }

      };

      checkConnectivityAndLoadData();
    }, [dispatch])
  );

  const renderItem = ({ item }) => (
    <Pet pet={item} onDetailsPress={() => navigation.navigate('DetailPetScreen', { petId: item._id })} />
  );


  const CombinedHeader = () => (
    <View style={styles.container}>
      <SearchBox navigation={navigation} />
      <Text style={[styles.title, stylesGlobal.text]}>Últimas mascotas encontradas</Text>
    </View>
  );


  return (
    <SafeAreaView style={[styles.safeArea, stylesGlobal.background]}>
      {!isConnected && <Message variant="danger">No hay conexión a internet.</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <>
          {pets && pets.length > 0 && (
            <FlatList
              data={pets}
              keyExtractor={(item) => item._id.toString()}
              renderItem={renderItem}
              ListHeaderComponent={CombinedHeader}
              numColumns={1}
            />
          )}
          <TouchableOpacity onPress={() => dispatch(listPets('', 1))}>
            <Text style={styles.retryButtonText}>Intentar de nuevo</Text>
          </TouchableOpacity>
        </>
      ) : (
        pets && (
          <FlatList
            data={pets}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderItem}
            ListHeaderComponent={CombinedHeader}
            numColumns={1}
          />
        )
      )}
      {!loading && pets && pets.length > 0 && (
        <Paginate
          pages={pages}
          page={page}
          onPageChange={(selectedPage) => dispatch(listPets("", selectedPage))}
        />
      )}
      <FloatingButton
        onPress={() => navigation.navigate('FoundPetFormScreen')}
        title="Publicar mascota encontrada"
      />
    </SafeAreaView>
  );
};
export default FounPetScreen;
