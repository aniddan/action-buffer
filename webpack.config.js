module.exports = {
    module: {
        loaders: [
            {
                test: /.js/,
                loader: 'babel'
            }
        ]
    },
    entry: './src/action-buffer.js',
    output: {
        filename: 'index.js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: 'ActionBuffer'
    }
};
