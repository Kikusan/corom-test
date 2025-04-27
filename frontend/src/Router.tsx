import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Users } from './pages/Users';
import LoginPage from './pages/Login';
import { ProtectedRoute } from './ProtectedRoute';
export function Router() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <Users />,
        },
      ],
    },
    {
      path: '/auth',
      element: <LoginPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
