import React from 'react';
import SneakerList from '../components/SneakerList';

const BrandPage = ({match}) => {

    const {brand} = match.params;

    return ( 
        <>
            <h2 className="text-center my-5 display-4">Les 50 dernières releases</h2>
            <SneakerList brand={brand} />
        </>
     );
}
 
export default BrandPage;