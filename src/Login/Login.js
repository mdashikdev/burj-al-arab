import React, { useContext, useState } from 'react';
import { GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile,onAuthStateChanged,getIdToken } from "firebase/auth";
import { auth } from './firebase.config';
import { UserContext } from '../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, useFormik } from 'formik';
import loading from './loading.gif'

const provider = new GoogleAuthProvider();

const Login = () => {
    const [user,setUser] = useContext(UserContext);
    const [lgrgsts,setlgrgsts] = useState(false);
    const navigate =useNavigate()
    const location=useLocation();
    const redirect = location?.state?.from ? `${location?.state?.from}` : '../' ;

    const storeToken = () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              const token = await getIdToken(user);
              sessionStorage.setItem('token', token)
            }
          });
    }

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          setUser(user);
          storeToken()
          navigate(redirect)
        }).catch((error) => {
            console.log(error.message)
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    const {handleSubmit,handleChange,handleBlur,values} =useFormik({
        initialValues:{
            name:'',
            email:'',
            pass:''
        },
        onSubmit: values => {
            const loadinggif=document.getElementById('loadinggif');
            loadinggif.style.display='block';
            if (!lgrgsts) {
                createUserWithEmailAndPassword(auth, values.email, values.pass)
                .then((userCredential) => {
                  // Signed in 
                  const user = userCredential.user;
                    updateProfile(auth.currentUser, {
                        displayName: values.name, photoURL: ""
                      }).then(() => {
                        loadinggif.style.display='none';
                        setUser(user)
                        storeToken()
                        navigate(redirect)
                      }).catch((error) => {
                        loadinggif.style.display='none';
                        alert(error.message)
                      });

                })
                .catch((error) => {
                    loadinggif.style.display='none';
                    alert(error.message)
                });
            }else{
                signInWithEmailAndPassword(auth, values.email,values.pass)
                .then((userCredential) => {
                  // Signed in 
                  const user = userCredential.user;
                  loadinggif.style.display='none';
                  setUser(user)
                  storeToken()
                })
                .catch((error) => {
                    loadinggif.style.display='none';
                    alert(error.message)
                });
            }
        }
    })

    return (
        <div className='w-full flex h-80 mt-16 justify-center items-center'>
            <div className='w-1/2 sm:w-11/12 flex flex-col gap-5 p-8 my-5 shadow-lg rounded'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3'>
                    <h2 className='text-4xl text-bold'>{!lgrgsts ? 'Register' : 'Login'}</h2>
                    {
                        !lgrgsts &&
                        <input name='name' required onChange={handleChange} onBlur={handleBlur} value={values.name} className='inpt_field' type="text" placeholder='Name..' />
                    }
                    <input name='email' required onChange={handleChange} onBlur={handleBlur} value={values.email} className='inpt_field' type="email" placeholder='Email..' />
                    <input name='pass' required onChange={handleChange} onBlur={handleBlur} value={values.pass} className='inpt_field' type="password" placeholder='Password..' />
                    <img src={loading} className='w-28 hidden' id='loadinggif' alt="" />
                    <input className='w-full py-2 bg-blue-500 cursor-pointer hover:bg-blue-600 duration-200 text-white rounded' type="submit" value={!lgrgsts ? 'Register' : 'Login'} />
                </form>
                <div className='flex gap-2'>
                    <input type="checkbox" id='checkbx' />
                    <label htmlFor="checkbx" onClick={() => setlgrgsts(!lgrgsts)}>Already registered?</label>
                </div>
                <button onClick={handleGoogleLogin} id='sbtn' className='inpt_field w-fit bg-yellow-400 text-white'>Login with Google</button>
            </div>
        </div>
    );
};

export default Login;