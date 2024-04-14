import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        backgroundColor: '#333',
        paddingHorizontal: 10,
    },
    backButton: {
        paddingRight: 10,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    loginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    cartButton: {
        paddingLeft: 10,
    },
    cartItemCountContainer: {
        position: 'absolute',
        top: -5,
        right: -10,
        backgroundColor: 'red',
        borderRadius: 15,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartItemCount: {
        color: 'white',
        fontWeight: 'bold',
    },
    usernameText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 16,
    },
});

export default styles;
