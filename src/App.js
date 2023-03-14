import './App.css';
import Home from "./pages/Home"
import Rooms from './pages/Rooms'
import SingleRoom from './pages/SingleRoom'
import Error from './pages/Error'

import { Route, Routes, useSearchParams } from 'react-router-dom'
import { useState } from 'react';
import {RoomProvider} from './context';
import { RoomContext } from './context';

import Navbar from './components/Navbar';
function App() {
  return (
   <RoomProvider>
    <>
    <Navbar/>
      <Routes>
        <Route exact path='/' element = {< Home/>}/>
        <Route exact path='/rooms' element = {<Rooms/>} />
        <Route exact path='/rooms/:slug' element = {<SingleRoom/>} /> 
        <Route path='*' element = {<Error/>} />
      </Routes>
    </>
    </RoomProvider>
  );
}

// function App() {
//   return (
//     <>
//     <Navbar/>
//       <Routes>
//         <Route exact path='/' element = {< Home/>}/>
//         <Route exact path='/rooms' element = {<Rooms/>} />
//         <Route exact path='/rooms/:slug' element = {<SingleRoom/>} /> 
//         <Route path='*' element = {<Error/>} />
//       </Routes>
//     </>

//   );
// }

export default App;
