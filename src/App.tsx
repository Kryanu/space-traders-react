import { router } from './router/router';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import type { ShellAuth } from './context/AuthContext';

const queryClient = new QueryClient();

function App({ auth }: { auth: ShellAuth }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider auth={auth}>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
