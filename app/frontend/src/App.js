import React from 'react';
import Navbar from './components/Navbar';
import SneakerList from './components/SneakerList';

const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <h2 className="text-center my-5 display-4">Les 50 dernières releases</h2>
      <SneakerList></SneakerList>
    </>
  );
}


export default App;
