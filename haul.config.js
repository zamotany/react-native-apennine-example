import { makeConfig } from '@haul-bundler/preset-0.59';
import path from 'path';
import { NormalModuleReplacementPlugin } from 'webpack';

const polyfills = [
  require.resolve('react-native/Libraries/polyfills/console.js'),
  require.resolve('react-native/Libraries/polyfills/error-guard.js'),
  require.resolve('react-native/Libraries/polyfills/Object.es7.js'),
];

const withPolyfills = entry => {
  if (Array.isArray(entry)) {
    return polyfills.concat(...entry);
  }

  return polyfills.concat(entry);
};

export default makeConfig({
  bundles: {
    index: {
      entry: withPolyfills('./src/host.js'),
      dependsOn: ['base_dll'],
      sourceMap: true,
      transform({ config, env }) {
        if (env.platform === 'ios') {
          config.output.filename = 'main.jsbundle';
        }
        return config;
      },
    },
    base_dll: {
      entry: withPolyfills([
        'react',
        'react-native',
        'react-navigation',
        'apollo-client',
        'apollo-link-http',
        'apollo-cache-inmemory',
        'react-apollo',
        'graphql-tag',
        'graphql',
      ]),
      dll: true,
      minify: false,
      type: 'indexed-ram-bundle',
      sourceMap: true,
      transform({ config, env }) {
        if (env.platform === 'ios') {
          config.output.filename = 'base_dll.jsbundle';
        }
        config.plugins.push(
          new NormalModuleReplacementPlugin(
            /react-dom*/,
            path.join(__dirname, './nullModule.js')
          )
        );
        return config;
      },
    },
    app0: {
      entry: './src/app0',
      dependsOn: ['base_dll'],
      app: true,
      type: 'indexed-ram-bundle',
      sourceMap: true,
      transform({ config, env }) {
        if (env.platform === 'ios') {
          config.output.filename = 'app0.jsbundle';
        }
        return config;
      },
    },
    app1: {
      entry: './src/app1',
      dependsOn: ['base_dll'],
      app: true,
      type: 'indexed-ram-bundle',
      sourceMap: true,
      transform({ config, env }) {
        if (env.platform === 'ios') {
          config.output.filename = 'app1.jsbundle';
        }
        return config;
      },
    },
  },
});
