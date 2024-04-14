import { useEffect, useCallback } from 'react';
import { BackHandler } from 'react-native';

const useAndroidBackButton = (navigation, customBackAction = null) => {
    const handleBackPress = useCallback(() => {
        if (customBackAction) {
            customBackAction();
            return true;
        } else {
            navigation.goBack();
            return true;
        }
        
    }, [customBackAction, navigation]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, [handleBackPress]);
};

export default useAndroidBackButton;
