import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles/PaginateStyle";

const Paginate = ({ pages, page, onPageChange }) => {
    return (
        pages > 1 && (
            <View style={styles.paginationContainer}>
                {[...Array(pages).keys()].map((x) => (
                    <TouchableOpacity
                        key={x + 1}
                        onPress={() => onPageChange(x + 1)}
                        style={[
                            styles.paginationItem,
                            x + 1 === page ? styles.activePaginationItem : {},
                        ]}
                    >
                        <Text
                            style={[
                                styles.paginationText, 
                                x + 1 === page ? styles.activePaginationText : {},
                            ]}
                        >
                            {x + 1}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    );
};
export default Paginate;
