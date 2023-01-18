import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Login from './components/login/Login';
import Register from './components/login/Register'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './redux/store';
import NavBar from './components/nav/Navbar';
import Startpage from './components/Startpage'
import User from './components/user/User';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([

  {
    path: "/",
    element: <NavBar />,
    children:
      [{
        path: "/home",
        element: <Startpage />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/profile",
        element: <User />
      },
      ]
  }]
);

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
