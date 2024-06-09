import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import App from './App';
import Home from './routes/home';
import Books from './routes/navbar';
import Sobre from './routes/sobre';
import Login from './routes/login.jsx';
import Register from "./routes/register";
import Bookdetails from "./routes/bookdetails";
import ErrorPage from "./routes/errror_page.jsx";
import Profile from "./routes/profile_page";
import AuthProvider from "./authcontext.jsx";
import MinhaEstante from "./estante.jsx";
import AddBook from "./routes/upoload_book_page.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'profile', element: <Profile /> },
      { path: 'books', element: <Books /> },
      { path: 'bookdetails/:id', element: <Bookdetails /> },
      { path: 'sobre', element: <Sobre /> },
      { path: "/minha-estante", element: <MinhaEstante />},
      { path: "/addBook", element: <AddBook />}

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ChakraProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ChakraProvider>
    </React.StrictMode>
)