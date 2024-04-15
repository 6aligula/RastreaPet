import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { listPetDetails } from '../store/actions/petActions';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import styles from './styles/DetailPetStyle';
import CarouselComponent from '../components/Carousel';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';
import { useColorSchemeContext } from '../ColorSchemeContext';
import NetInfo from "@react-native-community/netinfo";


function DetailProductScreen({ navigation, route }) {
  const [isConnected, setIsConnected] = useState(true);
  const { stylesGlobal } = useColorSchemeContext();

  useAndroidBackButton(navigation);

  const { petId } = route.params;
  const dispatch = useDispatch();

  const petDetails = useSelector((state) => state.petDetails);
  const { error, loading, pet } = petDetails;

  useEffect(() => {
    const checkConnectivityAndLoadData = async () => {
      const state = await NetInfo.fetch();
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        dispatch(listPetDetails(petId));
        //console.log("Conectado a internet?", state.isConnected);
      }
      
    };
    checkConnectivityAndLoadData();
  }, [dispatch, petId]);

  return (
    <SafeAreaView style={[stylesGlobal.background, styles.safeAreaContainer]}>
      {!isConnected && <Message variant="danger">No hay conexión a internet.</Message>}
      <ScrollView>
        {loading ? (
          <Loader />
        ) : error ? (
          <>
          {pet && pet.length > 0 && (
            <FlatList
              data={pet}
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

            {pet.images && pet.images.length ? (
              <CarouselComponent images={pet.images.map(img => img.image)} />
            ) : (
              <Text>No Images Available</Text>
            )}

            <Text style={styles.productPrice}>Recompensa: €{pet.reward}</Text>
            <Text style={[stylesGlobal.text ,styles.productName]}>Nombre: {pet.name}</Text>
            <Text style={[stylesGlobal.text, styles.productDescription]}>Tipo: {pet.category}</Text>
            <Text style={[stylesGlobal.text, styles.productDescription]}>Raza: {pet.breed}</Text>
            <Text style={[stylesGlobal.text, styles.productDescription]}>Edad: {pet.age} años</Text>
            <Text style={[stylesGlobal.text, styles.productDescription]}>Fecha cuando se perdio: {new Date(pet.missingDate).toLocaleDateString()} </Text>
            <Text style={[stylesGlobal.text, styles.productDescription]}>Se perdio en : {pet.city}, {pet.province}, {pet.address}</Text>

            <View style={styles.rating}>
              <Rating value={pet.rating} />
              <Text style={styles.rating}>{`${pet.numTrail} Pistas`}</Text>
            </View>
            
            <Text style={[stylesGlobal.text, styles.productDescription]}>Descripción: {pet.description}</Text>
       

          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailProductScreen;