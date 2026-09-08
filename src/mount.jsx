import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

export function mount(container, props = {}) {
  const root = createRoot(container);
  root.render(<App {...props} />);

  return () => root.unmount();
}
