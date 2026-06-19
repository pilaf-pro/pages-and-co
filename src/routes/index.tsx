import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/features/home/page';
import ListPage from '@/features/list/page';
import DetailPage from '@/features/detail/page';
import CheckoutPage from '@/features/checkout/page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'books',
        element: <ListPage />,
      },
      {
        path: 'books/:category',
        element: <ListPage />,
      },
      {
        path: 'detail',
        element: <DetailPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
    ],
  },
]);

export default router;
