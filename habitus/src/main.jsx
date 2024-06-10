import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import App from './App';
import Home from './routes/home';
import Books from './routes/navbar';
import About from './routes/sobre';
import Login from './routes/login.jsx';
import Register from "./routes/register";
import Bookdetails from "./routes/bookdetails";
import ErrorPage from "./routes/error_page.jsx";
import Profile from "./routes/profile_page";
import AuthProvider from "./authcontext.jsx";
import BookCase from "./routes/bookcase.jsx";
import AddBook from "./routes/upoload_book_page.jsx";
import Categorypage from "./routes/categorypage.jsx";

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
      { path: 'about', element: <About /> },
      { path: "/mybookcase", element: <BookCase />},
      { path: "/addBook", element: <AddBook />},
      {path: "/category/:category", element: <Categorypage />}
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