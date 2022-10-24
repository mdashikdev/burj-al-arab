import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';

const Book = () => {
    const {id} =useParams();
    const [user,setUser] = useContext(UserContext);
    const [book,setBook] = useState([]);

    const {values,handleBlur,handleChange,handleSubmit,resetForm} = useFormik({
      initialValues: {
            userName:user.displayName,
            userEmail:user.email,
            userId:user.uid,
            userphoto:user.photoURL,
            checkIn : new Date(),
            checkOut : new Date(),
        },
        onSubmit: (values) => {
        values.hotelId = id
          fetch('http://localhost:4000/booking',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
          })
          .then(res => res.json())
          .then(data => {
            console.log(data)
          })
          resetForm();
        }

    })

    useEffect(() => {
      fetch(`http://localhost:4000/currentbookings`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user})
      })
      .then(res => res.json())
       .then(data => {
        setBook(data)
       })
    }, [])
    

    return (
      <>
        <form onSubmit={handleSubmit} className='w-full mt-10 flex flex-col gap-5 justify-center items-center'>
           <div className='w-full mt-10 flex gap-5 justify-center items-center'>
            <div className='p-4 rounded shadow'>
              <h3 className='font-semibold text-xl'>Check In</h3>
              <input id='checkIn' onChange={handleChange} onBlur={handleBlur} value={values.checkIn} required className='mt-2 border px-4 py-2 rounded-md focus:outline-none' type="date" name=""/>
            </div>
            <div className='p-4 rounded shadow'>
              <h3 className='font-semibold text-xl'>Check Out</h3>
              <input id='checkOut' onChange={handleChange} onBlur={handleBlur} value={values.checkOut} required className='mt-2 border px-4 py-2 rounded-md focus:outline-none' type="date" name=""/>
            </div>
           </div>
          <button type="submit" className='bg-blue-600 shadow hover:shadow-lg hover:bg-blue-500 rounded duration-200 cursor-pointer px-4 py-1 text-white'>Book</button>
        </form>
      <div>
        <h3 className='text-2xl font-semibold mb-3'>My bookings</h3>
          <table>
            <thead>
              <td className='border'>From</td>
              <td className='border'>to</td>
            </thead>
            {
              book.map(bking => 
                <tr key={bking._id}>
                  <td className='border p-1'>{(new Date(bking.checkIn)).toDateString('dd/MM/yyyy')}</td>
                  <td className='border p-1'>{(new Date(bking.checkOut)).toDateString('dd/MM/yyyy')}</td>
                </tr>
                )
            }
          </table>
      </div>
      </>
    );
};

export default Book;