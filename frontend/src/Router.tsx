import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Users } from './pages/Users';
export function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Users />,
    },
  ]);

  return <RouterProvider router={router} />;
}
