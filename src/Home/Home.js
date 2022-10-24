import React from 'react';
import Hotel from '../Hotel/Hotel'
import fakeData from '../fakeData.json'

const Home = () => {
    return (
        <div className='w-full mt-11 grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                fakeData.map(hotel => <Hotel hotelInfo={hotel} key={hotel.id} />)
            }
        </div>
    );
};

export default Home;