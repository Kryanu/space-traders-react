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
        './mount': './src/mount.tsx',
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
    alias: {
      '@types': './src/types',
    },
    entry: {
    index: './src/main.tsx',
    },
  },
  server: {
    port: 5174,
  },
});
