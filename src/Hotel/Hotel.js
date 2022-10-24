import React from 'react';
import { Link } from 'react-router-dom';
import 'boxicons'

const Hotel = ({hotelInfo}) => {

    return (
        <div className='shadow bg-white basis-3/4 rounded'>
            <div className='w-18 h-18 flex justify-start items-center gap-2 mx-2 my-3'>
                <img className='w-12 h-12 border border-orange-500 rounded-full' src={hotelInfo.profile} alt=""/>
                <strong>{hotelInfo.name}</strong>
            </div>
            <img className='w-full h-48 object-cover' src={hotelInfo.hotelImage} alt="" />
            <p className='px-2 my-2'>{hotelInfo.hotelDescription.slice(0,70)}</p>
            <div className='flex my-3 mx-2 justify-between p-3'>
                <div className='flex gap-4'>
                    <div className='flex items-center font-bold p-1'>
                    <box-icon name='bed'></box-icon> : {hotelInfo.bed}</div>
                    <div className='flex items-center font-bold p-1'>
                    <box-icon name='male-female' ></box-icon> : {hotelInfo.persons}</div>
                    <div className='flex items-center font-bold p-1'>
                    $ : {hotelInfo.price}</div>
                </div>
                <Link to={`/book/${hotelInfo.id}`} className='px-4 py-2 bg-blue-500 hover:bg-slate-600 duration-200 text-white rounded'>Book</Link>
            </div>
        </div>
    );
};

export default Hotel;