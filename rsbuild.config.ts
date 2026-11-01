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
        './App': './src/App.tsx',
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
      '@api-hooks': './src/api/hooks',
    },
    entry: {
      index: './src/main.tsx',
    },
  },
  server: {
    port: 5174,
  },
});
