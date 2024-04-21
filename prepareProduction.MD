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