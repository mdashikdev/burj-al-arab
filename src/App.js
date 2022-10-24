import { createContext, useEffect, useState } from 'react';
import { Route, Routes,Link, useNavigate } from 'react-router-dom';
import './App.css';
import Book from './book/Book';
import Home from './Home/Home';
import Login from './Login/Login';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { getAuth, signOut } from "firebase/auth";

export const UserContext=createContext()

function App() {
  const [user,setUser] = useState({});
  const navigate = useNavigate()
  const handleLogOut = () => {

const auth = getAuth();
    signOut(auth).then(() => {
      setUser({})
      navigate('../')
    }).catch((error) => {
      console.log(error)
    });
  }

  useEffect(() => {
    if (user.email) {
      fetch(`https://burr-al-arab-server.onrender.com/${user.email}`,{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          authorization :  `Bearar ${sessionStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
    }
  }, [user])
  
  return (
    <UserContext.Provider value={[user,setUser]}>
        <div className='flex flex-col justify-center items-center'>
          <div className="relative mb-10 w-11/12 justify-center">
              <div className='w-full h-96 flex justify-center items-center'>
                  <img className='absolute w-full h-96 rounded object-cover' src="https://th.bing.com/th/id/R.eb31f68588b567c2918f4e9c67a8e39b?rik=2yoE4oKwP2HVUA&pid=ImgRaw&r=0" alt="" />
                  <h1 className='absolute font-extrabold text-6xl text-white'>Find yourself here</h1>
                  <ul className='flex gap-5 mt-40 text-white bg-slate-400 p-4 z-10'>
                      <Link to='/home' className='navBtn'>Home</Link>
                      <Link to='/book' className='navBtn'>Books</Link>
                      {
                        user?.displayName && 
                        <button className='navBtn bg-blue-500'>{user.displayName}</button>
                      }
                      {
                        user.displayName ? 
                          <button onClick={handleLogOut} className='navBtn'>Logout</button>
                        :
                          <Link to='/login' className='navBtn'>Login</Link>
                      }
                  </ul>
              </div>
              <Routes>
                  <Route exact path='/' element={<Home/>} />
                  <Route path='/home' element={<Home/>} />
                  <Route path='/book' element={'book'} />
                  <Route path='/login' element={<Login/>} />
                  <Route path='/book/:id' element={<PrivateRoute><Book/></PrivateRoute>} />
              </Routes>
          </div>
        </div>
    </UserContext.Provider>
  );
}

export default App;
