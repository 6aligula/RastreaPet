//useLocationPermissions.js

import { useCallback } from 'react';
import { PermissionsAndroid } from 'react-native';

const useLocationPermissions = () => {
  const requestLocationPermission = useCallback(async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permiso de Ubicación",
          message: "Esta aplicación necesita acceder a tu ubicación",
          buttonNeutral: "Preguntar después",
          buttonNegative: "Cancelar",
          buttonPositive: "Aceptar"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Error al solicitar permiso de ubicación', err);
      return false;
    }
  }, []);

  return { requestLocationPermission };
};

export default useLocationPermissions;
