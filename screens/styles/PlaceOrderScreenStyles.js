import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    addressSection: {
        marginVertical: 10,
    },
    subtitle: {
        color: '#34495e',
        fontWeight: 'bold',
    },
    addressDetails: {
        color: '#555',
    },
    orderSection: {
        marginVertical: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    itemName: {
        flex: 1,
        paddingLeft: 10,
        color: '#555',
    },
    itemPrice: {
        color: '#555',
    },
    summaryContainer: {
        marginVertical: 10,
    },
    summaryItem: {
        color: '#555',
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
});

export default styles;