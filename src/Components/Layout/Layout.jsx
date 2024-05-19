import React from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Layout({ userData, setUserData }) {

  // Logout function and navigate to login process.
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login')
  }


  return <>
    <div className='pt-5'>
      <Navbar logOut={logOut} userData={userData} />

      <div className="container">
        <Outlet></Outlet>
      </div>

      <Footer />

    </div>




  </>
}
