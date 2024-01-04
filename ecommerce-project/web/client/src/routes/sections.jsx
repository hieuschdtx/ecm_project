import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from 'src/layouts/dashboard';

export const HomePage = lazy(() => import('src/pages/home'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const ProductCategoryPage = lazy(() => import('src/pages/product-category'));
export const ProductDetailPage = lazy(() => import('src/pages/product-detail'));
export const CartPage = lazy(() => import('src/pages/cart'));
export const CheckoutPage = lazy(() => import('src/pages/checkout'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const ChangePasswordPage = lazy(() => import('src/pages/change-password'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const BlogDetailPage = lazy(() => import('src/pages/blog-detail'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const IntroductionPage = lazy(() => import('src/pages/introduction'));

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'gio-hang', element: <CartPage /> },
        { path: 'san-pham/:alias', element: <ProductCategoryPage /> },
        { path: 'san-pham', element: <ProductCategoryPage /> },
        { path: 'thong-tin-san-pham/:alias', element: <ProductDetailPage /> },
        { path: 'thanh-toan', element: <CheckoutPage /> },
        { path: 'customer/:alias', element: <ProfilePage /> },
        { path: 'tin-tuc', element: <BlogPage /> },
        { path: 'tin-tuc/:alias', element: <BlogDetailPage /> },
        { path: 'gioi-thieu', element: <IntroductionPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    { path: 'forgot-password', element: <ChangePasswordPage /> },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: (
        <Navigate
          to="/404"
          replace
        />
      ),
    },
  ]);

  return routes;
}
