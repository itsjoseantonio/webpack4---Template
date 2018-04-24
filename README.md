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
- **output** tiene su propia opcion que se llama ```path```, en donde le indicamos que a partir de la carpeta en donde se encuentra el archivo webpack.config.js (```__dirname```), cree una nueva carpeta llamada **dist**
- con **filename** le indicamos que nombre tendra nuestro archivo, y que a partir de la carpeta **dist**, cree una subcarpeta **js** y dentro coloque el archivo bundle.
- **[name]** toma el nombre del entry, si es que se colocó, en caso no tuviera nombre el entry, toma por defecto bundle, se puede quitar el parametro ```[name]``` y colocar un nombre especifico, ejemplo:
```bash
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/prueba.js"
  }
```
El archivo resultante en la carpeta dist se llamaria ```prueba.js```
### Module
En esta punto es en donde colocaremos todas las reglas que se utilizarán, para que webpack pueda interpertar nuestros archivos.
Los soportados en este archivos son:
- [css](https://github.com/webpack-contrib/css-loader)
- [scss/sass](https://github.com/webpack-contrib/sass-loader)
- [pug](https://github.com/willyelm/pug-html-loader)
- [html](https://github.com/jantimon/html-webpack-plugin)
- [jpg/png/svg](https://github.com/webpack-contrib/file-loader)
- json
- [js(es5/es6)](https://github.com/babel/babel-loader)
### Dev-Server
Este es el servidor local que crear ```webpack-dev-server``` usando node.js
- **ContentBase** acá se le tiene que indicar donde se encuentran los archivos que va a servir, en este caso, que tome todos los archivos de la carpeta ```./dist```
```bash
contentBase: path.resolve(__dirname, "dist")
```
- **Port** este punto sirve para indicarle a webpack en que puerto va levantar el servidor
- **Open** por defecto en false, le indica a webpack que cuando levante el servidor, tambien abra el localhost en nuestro browser predeterminado
- **historyApiFallback** esta función es un poco más opcional, le indica a webpack con su atributo **index** cual va a ser el html que se va a ejecutar en caso ocurra algun problema con el template principal
  - **nota** *historyApiFallback* siempre interpreta el archivo ```index.html``` como el principal, en caso no existiera este archivo, funcionaria el template que coloquemos en **index**
```
    historyApiFallback: {
      index: "another.html"
    }
```
### Plugins
En este punto, podremos agregar cualquier tipo de plugin que sea para webpack, para poder utilizar los plugin es necesario importarlos
```
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
```
#### [ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)
Este plugin permite poder tener nuestros archivos **css** en un archivo totalmente aparte
```
new ExtractTextPlugin("css/[name].css")
```
tenemos que indicale donde queremos que guarde los archivos en este caso seria ```./dist/css/[archivo].css```
#### [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)
Este plugin permite poder tener un tamplate de base y agregarle todos nuestros archivos sean *.css/js/imágenes*
- **filename** le indicamos donde queremos que guarde el archivo
  ```
  filename: "index.html"
  ```
  en este caso lo guardará en ```./dist/index.html```
- **template** acá le indicamos de donde queremos que saque el template
  ```
  template: "./src/pug/index.pug"
  ```
  en este caso el indicamos que lo saque de nuestra carpeta de desarrollo src
- **nota** en caso se quiera tener más de un template, se puede realizar simplemente creando una nueva instancia del plugin
  ```
    new HtmlWebpackPlugin({
        filename: "index1.html",
        template: "./src/pug/template1.pug"
    })
    new HtmlWebpackPlugin({
        filename: "index2.html",
        template: "./src/html/template1.html"
    })
  ```
  como se puede ver en el ejemplo, ```HtmlWebpackPlugin``` puede tomar un template de *pug o html* y de distintas rutas, en nuestra carpeta ```./dist``` quedaria así
  ```
  --dist
  ----css
  ----js
  --index1.html
  --index2.html
  ```
### Optimization
Esta opción es la que nos permite poder generar los *vendors* juntar todos los plugins de js que se utilizen y nos mezclarlos con nuestro archivos ```index.js```, para poder mantenerlo limpio
- **test** acá le vamos a indicar de donde queremos que saque lo *vendors*
  - Esta configurado para que los tome de 2 formas
    - La primera es por el archivo ```js/vendor/```, todos los plugins que se coloquen dentro de esta carpeta se incluirán en el archivo ```vendors.js```
    - La segunda forma es agregando los archivos como dependencias del proyecto, dentro del archivo ```package.json```
      ```
        "dependencies": {
        "gsap": "^1.20.4",
        "jquery": "^3.3.1"
        }
      ```
      en este ejemplo eh agregado 2 dependencias **jquery** y **gsap**, la forma de poder utilizarlas es simplemente importandolas dentro del js
      ```Archivo index.js```
      ```
        import $ from "jquery";
        import { TimelineMax, TweenMax } from "gsap";
      ```
      en caso no los importaramos, no se agregarian al archivo ```vendors.js```
- **name** acá le indicaremos a webpack, como queremos que se llame el archivo resultante ```name: "vendors"```

## IMPORTANTE
- Para poder generar correctamente el archivo de estilos, es necesario importar el archivo de estilos principal ```index.scss``` dentro del archivo ```index.js```
```
import "../style/index.scss
```
- Si se quiere agregar los archivos *css* y *js* al archivo template html/pug, no es necesario, el plugin **HtmlWebpackPlugin** ya lo hace por nosotros, solo se deberian agregar las imágenes que se requieran dentro del template html/pug
- Si se quiere usar un *json* como data solo basta con importarlo dentro del archivo js ```import json from "../json/archivo.json"```

## Adiciones
Se ha agregado una librería de ubigeo
[**Ubigeo-Peru**](https://github.com/TieicH/Ubigeo-Peru)


