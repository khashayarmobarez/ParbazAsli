import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// components
import Footer from './components/Footer/Footer';
import Navbar from './components/Header/Navbar';
import Profile from './containers/Profile';
import Equipment from './containers/Equipment';
import FlightEquipment from './components/pages/Equipment page comps/FlightEquipment';
import AddFlightEquipment from './components/pages/Equipment page comps/AddFlightEquipment';


const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <div className="App">
        <Navbar/>
          <Routes>

            <Route path='/profile' element={<Profile/>} />

            {/* equipments pages  */}
            <Route path='/equipment' element={<Equipment />} >
                <Route index element={<FlightEquipment />} />
                <Route path="flightEquipment" element={<FlightEquipment />} />
                <Route path="parachute" element={<FlightEquipment />} />
                <Route path="harness" element={<FlightEquipment />} />
            </Route>
            <Route path='/equipment/addFlightEquipment' element={<AddFlightEquipment />} />

            <Route path='/*' element={<Profile/>} />

          </Routes>
        <Footer />
      </div>

    </QueryClientProvider>



  );
}

export default App;