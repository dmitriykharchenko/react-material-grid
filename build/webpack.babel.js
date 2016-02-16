import path from  "path"
import webpack from "webpack"

const root = path.join(process.cwd(), 'src')

const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: "babel",
    query: {
      presets: ['es2015', 'stage-0', 'react']
    }
  },
  {
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader']
  }
]

export default [{
    entry: {
      Grid: [
        "./src/index.js",
      ],
      vendor: [
        'react',
        'ramda'
      ],
    },

    output: {
      path: "./dist",
      filename: '[name].js',
      publicPath: "/"
    },

    module: {
      loaders: loaders
    }
    // plugins: [
    //   new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js")
    // ]
  }
]
