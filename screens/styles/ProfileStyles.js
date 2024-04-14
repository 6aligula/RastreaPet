import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        margin: 20,
        fontFamily: 'Arial',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#2c3e50',
        textAlign: 'center',
    },
    errorMessage: {
        color: 'red',
        marginBottom: 16
    },
    input: {
        fontWeight: 'bold',
        color: '#27ae60',
        borderColor: 'grey',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10
    },
    inputField: {
        marginBottom: 10,
        width: '100%',
    },
    logoutButton: {
        flexDirection: 'row',
        width: 80,
        height: 50,
        backgroundColor: 'gray',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
    },
    myOrdersButton: {
        flexDirection: 'row',
        width: 100,
        height: 60,
        backgroundColor: 'gray',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10,
    },
});
export default styles;