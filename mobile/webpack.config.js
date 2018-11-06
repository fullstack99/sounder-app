const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env['NODE_ENV'] === 'production';
const src = path.join(__dirname, 'src');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: !isProduction
});

const config = {
    entry: path.join(src, 'main.ts'),
    output: {
        path: path.join(__dirname, 'www'),
        filename: 'bundle.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=images/[name].[ext]'
                ]
            }
        ]
    },
    externals: {
        'three': 'THREE',
        'firebase': 'firebase',
        'firebase/firestore': 'firebase',
    },
    plugins: [
        extractSass
    ]
};

if (isProduction) {
    config.devtool = '';
} else {
    config.devtool = 'inline-source-map';
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

config.plugins.push(
    new HtmlWebpackPlugin({
        title: 'index.html',
        template: path.join(src, 'index.html')
    }),
    new CopyWebpackPlugin([{
        from: 'src/assets',
        to: 'assets'
    }])
);

module.exports = config;