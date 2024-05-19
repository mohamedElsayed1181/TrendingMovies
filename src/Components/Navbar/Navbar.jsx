import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ userData , logOut }) {
  return <>

    <nav className="navbar fixed-top navbar-expand-sm text-white">
      <div className="container">
        <Link className="navbar-brand cursor-pointer text-white" to="/"><i class="fa-solid fa-photo-film"></i>  MovieWise</Link>
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa-solid fa-down-left-and-up-right-to-center text-white"></i>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">

        
            <ul className="navbar-nav me-auto mt-2 px-5 mt-lg-0 ">

              <li className="nav-item mx-2">
                <Link className="nav-link" to="/">Home </Link>
              </li>


              <li className="nav-item mx-2">
                <Link className="nav-link" to="movies">Movies</Link>
              </li>

              <li className="nav-item mx-2">
                <Link className="nav-link" to="tvshow">TV Show</Link>
              </li>

              <li className="nav-item mx-2">
                <Link className="nav-link" to="People">People</Link>
              </li>

            </ul> 


          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">

            {userData === null ?
              <>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="login">Login<i class="fa-solid fa-right-to-bracket mx-2"></i></Link>
                </li>

                <li className="nav-item mx-2">
                  <Link className="nav-link" to="register">Register <i class="fa-solid fa-user-plus mx-2"></i></Link>
                </li>
              </> :
              <>



                <li className="nav-item">
                  <span onClick={logOut} className="cursor-pointer nav-link">Logout <i class="fa fa-sign-out mx-1" aria-hidden="true"></i></span>
                </li> </>}

          </ul>
        </div>         
      </div>
    </nav>


  </>
}