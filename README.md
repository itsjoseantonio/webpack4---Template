# Webpack 4 Template

## Instalación
Descargar el proyecto en tu equipo local
```bash
git clone (url del repositorio ( ssh|https ))
```
### Instalar dependencias
Una vez descargado el proyecto, ingresar a la carpeta en donde se encuentra y colocar el siguiente comando:
```bash
npm install
```
Con esto podremos descargar todas las dependencias del ```packaje.json```
### Modos de ejecución
Dentro del archivo ```packaje.json``` existen 4 tipos de ejecución del proyecto
```bash
  "scripts": {
    "clean": "rimraf ./dist",
    "dev": "npm run clean && webpack --mode development",
    "prod": "npm run clean && webpack --mode production",
    "server": "webpack-dev-server --mode development"
  }
```
### Clean:
Utiliza una dependecia llamada ```rimraf```, lo que hace es eliminar todo el directorio ```./dist```.
Para ejecutar el script usar el siguiente comando:
```bash
npm run clean
```
### Dev:
Llama al primer script **clean** y crea la carpeta ```./dist``` nuevamente, con todos los archivos listos, la funcion ```--mode development``` es propia de webpack4, permite realizar un bundle en modo desarrollo.
Para ejecutar el script usar el siguiente comando:
```bash
npm run dev
```
### Prod:
Llama al primer script **clean** y crea la carpeta ```./dist``` nuevamente, con todos los archivos listos, la diferencia con **dev** es que el ```--mode production``` realizar el bundle de todos los archivos, optmizandolos al máximo para reducir su tamaño(minificar).
Para ejecutar el script usar el siguiente comando:
```bash
npm run prod
```
### Server:
Crea ambiente local de desarrollo que tomará todos nuestros archivos de la carpeta ```./dist``` y los servirá.
Para ejecutar el script usar el siguiente comando:
```bash
npm run server
```
***nota:*** 
- ```webpack-dev-server``` tambien pide colocar un tipo de modo sea **development** o **production**, se recomienda mantenerlo con **development** para reducir el tiempo en que realiza el bundle.
- ```webpack-dev-server``` no crea los archivos bundle en físico, los carga en memoria, si se requieren los archivos se puede utilizar **Dev** o **Prod**
- Si se necesita se puede concatenar scripts y crea uno personalizado para que cree los archivos en físico y los sirva
ejemplo:
```bash
  "scripts": {
    "clean": "rimraf ./dist",
    "dev": "npm run clean && webpack --mode development",
    "prod": "npm run clean && webpack --mode production",
    "server": "webpack-dev-server --mode development",
      // script personalizado
    "server2": "npm run (dev o prod) && npm run server",
  }
```
Para ejecutar el script usar el siguiente comando:
```bash
npm run server2
```

## webpack.config.js
Este es el archivo de configuracion que webpack reconocerá.

### Path
Es un módulo propio de node.js, que se encarga de manejar las rutas de los archivos.
con ```path.resolve(__dirname, "src/js/index.js")``` le indicamos que resuelva la ruta ```"src/js/index.js"``` a partir del ```"___dirname"``` que hace referencia a la carpeta en donde se encuentra el archivo webpack.config.js
### Entry
Este punto es para poder indicarle a webpack donde se encuentra nuestro archivo raiz
```bash
  entry: {
    index: path.resolve(__dirname, "src/js/index.js")
  }
```
- la palabra ```index``` es una variable, se puede colocar el nombre que se desee.
### Output
Acá le indicaremos a webpack donde queremos que coloque los archivos bundle
```bash
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js"
  }
```
- **output** tiene su propia opcion que se llama ```path```, en donde le indicamos que a partir de la carpeta en donde se encuentra el archivo webpack.config.js (```"__dirname"```), cree una nueva carpeta llamada **dist**
- con **filename** le indicamos que nombre tendra nuestro archivo, y que a partir de la carpeta **dist**, cree una subcarpeta **js** y dentro coloque el archivo bundle.
- **[name]** toma el nombre del entry, si es que se colocó, en caso no tuviera nombre el entry, toma por defecto bundle, se puede quitar el parametro ```[name]``` y colocar un nombre especifico, ejemplo:
```bash
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/prueba.js"
  }
```
El archivo resultante en la carpeta dist se llamaria ```prueba.js```
