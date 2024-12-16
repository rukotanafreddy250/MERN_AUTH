import React from 'react'
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import HomeScreens from './screens/HomeScreens';

 const App = () => {
  return ( 
    <>
    <Header />
    <Container className='my-2'>
      <Outlet />
    </Container>
    </>
  )
}

export default App;
