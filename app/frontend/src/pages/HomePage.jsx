import React from 'react'
import SneakerList from '../components/SneakerList'

const HomePage = () => {
    return ( 
        <>
            <h2 className="text-center my-5 display-4">Les 50 dernières releases</h2>
            <SneakerList />
        </>
    );
}
 
export default HomePage;