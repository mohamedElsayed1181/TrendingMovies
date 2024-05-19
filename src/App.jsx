import React from 'react'
import './App.css';
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tvshow from './Components/Tvshow/Tvshow';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import ProtectedRoute from'./Components/ProtectedRoute/ProtectedRoute';
import MovieDetails from './Components/MovieDetails/MovieDetails';


export default function App() {
  useEffect(() => {
    if (localStorage.getItem('userToken')!== null && userData === null) {
     saveUserData();
    }
  },[]);


  // To make decode and save user information and make sure the user is signed in or not.
  const [userData, setUserData] = useState(null);

  
  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  let routers = createBrowserRouter([
    {
      path: "", element: <Layout setUserData={setUserData} userData={userData} />, children: [
        { path: "Home", element:<ProtectedRoute><Home /></ProtectedRoute>  },
        { index: true, element:<Home />},
        { path: "movies", element:<ProtectedRoute><Movies /></ProtectedRoute>  },
        { path: "tvshow", element:<ProtectedRoute><Tvshow /></ProtectedRoute>  },
        { path: "people", element:<ProtectedRoute> <People /></ProtectedRoute> },
        { path: "moviedetails/:id/:mediatype", element:<ProtectedRoute> <MovieDetails /></ProtectedRoute> },
        { path: "login", element:<Login saveUserData={saveUserData} /> },
        { path: "register", element:<Register /> },
        { path: "*", element:<Notfound /> },
      ]
    }
  ])

  return <>
    <RouterProvider router={routers}></RouterProvider>
  </>
}
