# Ejecutar npm audit --omit=dev:
```bash
npm audit --omit=dev
```
```bash
Log: found 0 vulnerabilities
```

Este comando revisa las dependencias de tu proyecto para identificar vulnerabilidades conocidas en las versiones de los paquetes que estás utilizando, pero solo en el entorno de producción (omitirá las dependencias de desarrollo). Es una buena práctica ejecutarlo antes de realizar cambios significativos, como añadir nuevas dependencias, para asegurarte de que no estás introduciendo problemas de seguridad inadvertidamente.

# Limpieza de console.log del código:

Antes de proceder a añadir nuevas funcionalidades o dependencias, es ideal limpiar el código de cualquier declaración de console.log que haya sido utilizada para depuración durante el desarrollo. Esto ayuda a mantener el código limpio y optimiza la performance de la aplicación en producción, además de evitar la exposición de datos sensibles o información de depuración innecesaria.

# Instalar @bam.tech/react-native-make:

```bash
npm install --save-dev @bam.tech/react-native-make
```
Una vez que has asegurado que tu entorno está limpio y seguro, puedes proceder a instalar nuevas dependencias. En este caso, @bam.tech/react-native-make te ayudará a manejar los recursos gráficos de tu aplicación de React Native más eficientemente. Usar --save-dev es adecuado ya que esta herramienta solo es necesaria durante el desarrollo y no en el entorno de producción:

Generar los íconos: Una vez instalada, puedes usar el comando específico para generar íconos de mipmap. Por ejemplo:

```bash
npx react-native set-icon --path path_to_your_icon.png
```
Con las imagenes creadas podemos desinstalar la herramienta:

```bash
npm uninstall --save-dev @bam.tech/react-native-make
```

cambiar el nombre a la app:

# crear el almacen de claves:
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000 -storepass passwordsegura -keypass passwordsegura
```

# Configura las variables de Gradle:
* Añade las siguientes líneas en android/gradle.properties o ~/.gradle/gradle.properties (Parece opcional)

```bash
MYAPP_UPLOAD_STORE_FILE=System.getenv('MYAPP_UPLOAD_STORE_FILE')
MYAPP_UPLOAD_KEY_ALIAS=System.getenv('MYAPP_UPLOAD_KEY_ALIAS')
MYAPP_UPLOAD_STORE_PASSWORD=System.getenv('MYAPP_UPLOAD_STORE_PASSWORD')
MYAPP_UPLOAD_KEY_PASSWORD=System.getenv('MYAPP_UPLOAD_KEY_PASSWORD')
```


# Configura la firma en android/app/build.gradle:
* Añade la siguiente configuración
```bash
android {
    ...
    signingConfigs {
        release {
            if (System.getenv('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(System.getenv('MYAPP_UPLOAD_STORE_FILE'))
                storePassword System.getenv('MYAPP_UPLOAD_STORE_PASSWORD')
                keyAlias System.getenv('MYAPP_UPLOAD_KEY_ALIAS')
                keyPassword System.getenv('MYAPP_UPLOAD_KEY_PASSWORD')
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```
# Crear el bundle

cd android
./gradlew bundleRelease
