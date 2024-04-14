import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    paginationItem: {
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginHorizontal: 5,
    },
    activePaginationItem: {
        backgroundColor: "#007bff",
    },
    paginationText: {
        fontSize: 16,
        color: '#555555'
    },
    activePaginationText: {
        color: "#555555",
    },
});
export default styles;