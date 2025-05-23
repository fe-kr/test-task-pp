const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

const appDirectory = path.resolve(__dirname, "../");
const envFilePath = path.resolve(appDirectory, ".env");
const npmDirectory = path.resolve(appDirectory, "node_modules");
const babelConfig = require("../babel.config");

const rawNodeModulesPaths = [
  path.resolve(npmDirectory, "@react-navigation"),
  path.resolve(npmDirectory, "@react-native-async-storage"),
];

// Workaround for fix build errors
const nodeModulesConfiguration = {
  test: /\.(tsx|jsx|ts|js)?$/,
  include: rawNodeModulesPaths,
  resolve: {
    fullySpecified: false,
  },
};

const babelLoaderConfiguration = {
  test: /\.(tsx|jsx|ts|js)?$/,
  exclude: rawNodeModulesPaths,
  include: [
    path.resolve(appDirectory, "index"),
    path.resolve(appDirectory, "src"),
  ],
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      presets: babelConfig.presets,
      plugins: ["react-native-web", ...(babelConfig.plugins || [])],
    },
  },
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: "url-loader",
    options: {
      name: "[name].[ext]",
      esModule: false,
    },
  },
};

const fontLoaderConfiguration = {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
        outputPath: "fonts/",
      },
    },
  ],
};

module.exports = (argv) => {
  return {
    entry: path.resolve(appDirectory, "index"),
    output: {
      clean: true,
      path: path.resolve(appDirectory, "dist"),
      filename: "[name].[chunkhash].js",
      sourceMapFilename: "[name].[chunkhash].map",
      chunkFilename: "[id].[chunkhash].js",
    },
    resolve: {
      alias: {
        "react-native$": "react-native-web",
      },
      extensions: [
        ".web.js",
        ".js",
        ".web.ts",
        ".ts",
        ".web.jsx",
        ".jsx",
        ".web.tsx",
        ".tsx",
      ],
    },
    module: {
      rules: [
        babelLoaderConfiguration,
        nodeModulesConfiguration,
        imageLoaderConfiguration,
        fontLoaderConfiguration,
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(appDirectory, "web/public/index.html"),
      }),
      new webpack.DefinePlugin({
        __DEV__: argv.mode !== "production" || true,
        process: {
          env: JSON.stringify(dotenv.config({ path: envFilePath }).parsed),
        },
      }),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "initial",
          },
        },
      },
    },
  };
};
