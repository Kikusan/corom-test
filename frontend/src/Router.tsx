import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Demo from './Demo';
export function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Demo />,
    },
  ]);

  return <RouterProvider router={router} />;
}
