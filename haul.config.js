import { makeConfig } from "@haul-bundler/preset-0.59";

const polyfills = [
  require.resolve('react-native/Libraries/polyfills/console.js'),
  require.resolve('react-native/Libraries/polyfills/error-guard.js'),
  require.resolve('react-native/Libraries/polyfills/Object.es7.js'),
];

const withPolyfills = (entry) => {
  if (Array.isArray(entry)) {
    return polyfills.concat(...entry);
  } 

  return polyfills.concat(entry);
}

export default makeConfig({
  bundles: {
    index: {
      entry: withPolyfills('./src/host.js'),
      dependsOn: ['base_dll'],
      sourceMap: true,
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
        'graphql'
      ]),
      dll: true,
      minify: false,
      type: 'indexed-ram-bundle',
      sourceMap: true,
    },
    app0: {
      entry: './src/app0',
      dependsOn: ['base_dll'],
      app: true,
      type: 'indexed-ram-bundle',
      sourceMap: true,
    },
    app1: {
      entry: './src/app1',
      dependsOn: ['base_dll'],
      app: true,
      type: 'indexed-ram-bundle',
      sourceMap: true,
    }
  },
});