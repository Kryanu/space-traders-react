import { createRoot } from 'react-dom/client';
import App from './App';
import { Fetch } from './api/http/http-client';
import type { ShellAuth } from './context/AuthContext';
import './index.css';

export function mount(container: HTMLElement, props: { auth: ShellAuth }) {
  const { auth } = props;
  Fetch.setTokenGetter(() => auth.getState().token);

  const root = createRoot(container);
  root.render(<App auth={auth} />);

  return () => root.unmount();
}