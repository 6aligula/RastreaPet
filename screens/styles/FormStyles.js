import { StyleSheet } from 'react-native';

const ShippingStyles = StyleSheet.create({
    formContainer: {
        width: 300,
        margin: 20,
        fontFamily: 'Arial',
    },
    inputField: {
        marginBottom: 10,
        width: '100%',

    },
    dateDisplay: {
        fontWeight: 'bold',
        color: '#27ae60',
    },
    input: {
        fontWeight: 'bold',
        color: '#27ae60',
        borderColor: 'grey', 
        borderWidth: 1, 
        borderStyle: 'solid', 
        borderRadius: 10
    },
    label: {
        fontSize: 12,
        fontWeight: 'normal',
        marginTop: 8,
        marginBottom: 4,
        color: '#34495e',
        textAlign: 'center',
    },
    safeAreaContainer: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    roundedButton: {
        borderRadius: 50,
        overflow: 'hidden',
    },
    quantityPicker: {
        backgroundColor:'#ECECEC',
        fontSize: 16,
        color: '#34495e',
        marginTop: 8, 
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#2c3e50',
        textAlign: 'center',
    },
    imagePreviewContainer: {
        position: 'relative',
        padding: 5,
    },
    imagePreview: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    removeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        borderRadius: 15,
        padding: 5,
        zIndex: 1,
    }, 
});
export default ShippingStyles;