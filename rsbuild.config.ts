import { defineConfig } from '@rsbuild/core';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';
export default defineConfig({
  plugins: [
    pluginReact(),
    pluginTailwindcss(),
    pluginModuleFederation({
      name: 'space_traders',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.jsx',
        './mount': './src/mount.jsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  html: {
    template: './index.html',
  },
  source: {
    entry: {
      index: './src/main.jsx',
    },
  },
  server: {
    port: 5174,
  },
});
