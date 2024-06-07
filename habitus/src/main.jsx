import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import Home from './routes/home';
import Books from './routes/navbar';
import Sobre from './routes/sobre';
import Login from './routes/login';
import './index.css';
const domain = "dev-z0487levipd7htl5.us.auth0.com";
const clientId = "J9Upm1Sal0UMXYZLmKAqbmHB5oU7GPYz";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'books',
        element: <Books />,
      },
      {
        path: 'sobre',
        element: <Sobre />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri="http://localhost:3000"
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </ChakraProvider>
  </React.StrictMode>
);
