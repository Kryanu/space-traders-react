import { mount } from './mount';
import type { ShellAuth } from './context/AuthContext';

const standaloneAuth: ShellAuth = {
  getState: () => ({}),
  subscribe: () => () => undefined,
  login: async () => {
    throw new Error('Authentication is available through Sharp Shell.');
  },
  register: async () => {
    throw new Error('Registration is available through Sharp Shell.');
  },
  logout: () => undefined,
};

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element "root" was not found.');
}

mount(rootElement, { auth: standaloneAuth });
