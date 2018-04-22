const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src/js/index.js')
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'js/[name].js'
    },
    module:{
        rules: [
            //ARCHIVOS DE ESTILOS
            {
                // test: que tipo de archivo quiero reconocer,
                // use: que loader se va a encargar del archivo
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  // ['style-loader','css-loader']
                  // fallback: 'style-loader',
                  use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            }
                        },
                        { loader: 'postcss-loader', options: { sourceMap: true } }
                    ]
                }),
            },
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader','sass-loader']
                })
            },
            //ARCHIVOS PARA TEMPLATE
            {
                test: /\.pug$/,
                use: ['html-loader','pug-html-loader']
            },
            //ARCHIVOS DE PROGRAMACION
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['env']
                  }
                }
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 3000,
        //abre el servidor, ejecutando el html en el browser que tengamos por defecto
        open: true,
        // indicar a webpack que html usar, como index, funciona siempre y cuando no exista un html con nombre index
        // ya que esta funcion se ejecuta si es que le pasa algo al archivo principal, en este caso index.html
        // al no tener este archivo no sabe a donde apuntar y se puede elegir cual cargar
        historyApiFallback: {
            index: 'another.html'
        }
      },
    plugins:[
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            //template: './src/pug/index.pug',
            template: './src/pug/html.html'
        }),
        /*new HtmlWebpackPlugin({
            filename: 'another.html',
            template: './src/pug/another.pug',
        })*/
    ]
}