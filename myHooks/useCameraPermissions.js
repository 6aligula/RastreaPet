import { useCallback } from 'react';
import { PermissionsAndroid } from 'react-native';

const useCameraPermissions = () => {
    const requestCameraPermission = useCallback(async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Permiso de Cámara",
            message: "Esta aplicación necesita acceder a tu cámara",
            buttonNeutral: "Preguntar después",
            buttonNegative: "Cancelar",
            buttonPositive: "Aceptar"
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }, []);
  
    return { requestCameraPermission };
  };
  
  export default useCameraPermissions;
  
