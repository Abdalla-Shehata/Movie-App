import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Navigate } from 'react-router-dom';

import Root from './Root';
import Register from './component/register/Register'
import Login from './component/login/Login'
import Home from './component/home/Home'
import People from './component/People/People'
import Network from './component/network/Network'
import Movies from './component/movies/Movies'
import NotFound from './component/notfound/NotFound'
import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react';
import Details from './component/Details';




function App() {

  useEffect(() => {
    if (localStorage.getItem('token') !== null)
      saveCurrentUser()
  }, [])

  let [user, setUser] = useState(null)
  function saveCurrentUser() {   // visible and can be sent to all app components
    let encoded = localStorage.getItem('token')
    let decoded = jwtDecode(encoded)
    console.log(decoded);
    setUser(decoded)
  }

  function Protect(props) {  // should be capital name fn
    if (localStorage.getItem('token') === null)
      return <Navigate to='/login' />
    else
      return props.children   // component inside Protect    <Protect> <component /> </Protect>
  }

  function logOut() {
    localStorage.removeItem('token')
    setUser(null)
    // <Navigate to='/login' />
  }

  const routes = createBrowserRouter([
    {
      path: '/', element: <Root DATA={user} logout={logOut}></Root>,
      children: [
        { path: 'register', element: <Register /> },
        { index: true, element: <Login saveCurrentUserPro={saveCurrentUser} /> },
        { path: 'home', element: <Protect> <Home /> </Protect> },
        { path: 'people', element: <Protect> <People /> </Protect> },
        { path: 'network', element: <Protect> <Network /> </Protect> },

        { path: 'details/:id', element: <Protect> <Details /> </Protect> },  //send parameter with path
        
        { path: 'movies', element: <Protect> <Movies /> </Protect> },
        { path: 'login', element: <Login saveCurrentUserPro={saveCurrentUser} /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>

  );
}

export default App;
