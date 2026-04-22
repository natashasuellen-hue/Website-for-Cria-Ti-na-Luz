import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AdminProvider } from './contexts/AdminContext';
import { DataProvider } from './contexts/DataContext';

export default function App() {
  return (
    <AdminProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </AdminProvider>
  );
}