// CarouselStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth, // Asegura que el contenedor ocupe todo el ancho de la pantalla
    height: 250, // Puedes ajustar la altura según tus necesidades
  },
  image: {
    width: '100%', // Usa el 100% del contenedor para la imagen
    height: '100%', // Ajusta la altura al 100% del contenedor
    resizeMode: 'contain' // Cambiado a 'contain' para asegurarse de que la imagen se ajuste sin cortarse
  }
});

export default styles;
