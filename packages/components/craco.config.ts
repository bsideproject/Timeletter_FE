// @ts-nocheck
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';
import CracoAlias from 'craco-alias';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
  webpack: {
    plugins: [new VanillaExtractPlugin(), new MiniCssExtractPlugin()],
    module: {
      rules: [
        {
          test: /\.vanilla\.css$/i, // Targets only CSS files generated by vanilla-extract
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: (resourcePath, context) => {
                  // publicPath is the relative path of the resource to the context
                  // e.g. for ./css/admin/main.css the publicPath will be ../../
                  // while for ./css/main.css the publicPath will be ../
                  return path.relative(path.dirname(resourcePath), context) + '/';
                },
              },
            },
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|eot|woff|woff2|ttf)$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
  },
  babel: {
    plugins: ['@vanilla-extract/babel-plugin'],
  },
};
