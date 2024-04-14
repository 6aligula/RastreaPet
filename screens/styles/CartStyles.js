import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#2c3e50',
    },
    productPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#27ae60',
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
    subtitle: {
        fontSize: 18,
        fontWeight: 'normal',
        marginTop: 8,
        marginBottom: 4,
        color: '#34495e',
        textAlign: 'center',
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
    quantityContainer: {
        marginBottom: 16,
    },
    quantityPicker: {
        backgroundColor:'#ECECEC',
        fontSize: 16,
        color: '#34495e',
        marginTop: 8, 
        marginBottom: 8,
    },
});
export default styles;