import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


export default function Navbar(props) {
  useEffect(() => {
    console.log(props.DATA); 
  }, [props.DATA])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="home">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {props.DATA ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to='home' aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="movies">movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="people">people</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="network">network</Link>
            </li>
          </ul> : ''}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            {props.DATA ? <>
              <li className="nav-item">
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                </form>
              </li>

              <li className="nav-item">
                <i className='fa-brands fa-facebook mx-3'></i>
              </li>
              <li className="nav-item">
                <i className='fa-brands fa-twitter mx-3'></i>
              </li>
              <li className="nav-item">
                <i className='fa-brands fa-google mx-3'></i>
              </li>
              <li className="nav-item">
                <span className="nav-link" onClick={props.logout} >logout</span>
              </li>
            </> : <>

              <li className="nav-item">
                <Link className="nav-link" to="register">register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="">login</Link>
              </li>
            </>}

          </ul>

        </div>
      </div>
    </nav>
  )
}
