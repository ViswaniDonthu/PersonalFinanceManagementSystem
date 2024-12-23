

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Dashboard from './Dashboard';
import Balance from './Balance';
import Transactions from './Transactions';
import Bills from './Bills';
import Expenses from './Expenses';
import Goals from './Goals';
import LoginSignup from './login_signup_react';

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginSignup/> // Root route for login
  },
  {
    path: '/dashboard',
    element: <Dashboard />, // Dashboard as a parent layout
    children: [
      { path: 'balance', element: <Balance /> },
      { path: 'transactions', element: <Transactions /> },
      { path: 'bills', element: <Bills /> },
      { path: 'expenses', element: <Expenses /> },
      { path: 'goal', element: <Goals /> },
    ],
  },
]);

export const RouteApp = () => {
  return <RouterProvider router={router} />;
};

export default RouteApp;
