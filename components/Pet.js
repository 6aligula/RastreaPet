// Pet.js
import React from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import Rating from './Rating';
import styles from './styles/PetStyle';
import CarouselComponent from './Carousel';
import { useColorSchemeContext } from '../ColorSchemeContext';

const Pet = ({ pet, onDetailsPress }) => {
  const { stylesGlobal } = useColorSchemeContext();
  return (
    <View style={[stylesGlobal.background, styles.row]}>
      {pet.missing && <Text style={styles.price}>Recompensa {pet.reward}€</Text>}

      {pet.images && pet.images.length ? (
        <CarouselComponent images={pet.images.map(img => img.image)} />
      ) : (
        <Text>No Images Available</Text>
      )}

      <Text style={[stylesGlobal.text, styles.title]}>Nombre: {pet.name}</Text>
      <Rating value={pet.rating} />
      <Text style={stylesGlobal.text}>{`${pet.numTrail} Pista`}</Text>

      <TouchableOpacity onPress={onDetailsPress} style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Ver detalles</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Pet;