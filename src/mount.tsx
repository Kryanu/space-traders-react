import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

export function mount(
  container: HTMLElement,
  props: Record<string, unknown> = {}
) {
  const root = createRoot(container);
  const AppWithProps = App as ComponentType<Record<string, unknown>>;
  root.render(<AppWithProps {...props} />);

  return () => root.unmount();
}