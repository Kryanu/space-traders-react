import { mount } from './mount';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element "root" was not found.');
}

mount(rootElement);