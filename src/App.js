import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

// dark and light mode

// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// components
import Footer from './components/Footer/Footer';
import Navbar from './components/Header/Navbar';
import Profile from './containers/Profile';
import Equipment from './containers/Equipment';
import FlightEquipment from './components/pages/Equipment page comps/FlightEquipment';
import AddFlightEquipment from './components/pages/Equipment page comps/AddFlightEquipment';
import Parachute from './components/pages//Equipment page comps/Parachute'
import Harness from './components/pages//Equipment page comps/Harness'
import AddParachute from './components/pages/Equipment page comps/AddParachute';
import AddHarness from './components/pages/Equipment page comps/AddHarness';


const queryClient = new QueryClient();


function App() {

  const [userRole, setUserRole] = useState('coach');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const themeFile = isDarkMode ? 'darkTheme.css' : 'lightTheme.css';
    import(`./styles/Themes/${themeFile}`).then(() => {
      document.documentElement.classList.add(isDarkMode ? 'dark-theme' : 'light-theme');
    });
  
    return () => {
      document.documentElement.classList.remove('dark-theme', 'light-theme');
    };
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };


  
  return (
      <QueryClientProvider client={queryClient}>

        <div className="App">
          <Navbar toggleTheme={toggleTheme}  />
            <Routes>

            {userRole === 'coach' && (
              <>
              
                <Route path='/profile' element={<Profile/>} />

                <Route path='/*' element={<Profile/>} />

                {/* coach equipments pages  */}
                <Route path='/equipment' element={<Equipment />} >
                    <Route index element={<FlightEquipment />} />
                    <Route path="flightEquipment" element={<FlightEquipment />} />
                    <Route path="parachute" element={<Parachute />} />
                    <Route path="harness" element={<Harness />} />
                </Route>
                <Route path='/equipment/addFlightEquipment' element={<AddFlightEquipment />} /> 
                <Route path='/equipment/addParachute' element={<AddParachute />} />
                <Route path='/equipment/addHarness' element={<AddHarness />} />

              </>
            )}

            </Routes>
          <Footer />
        </div>

      </QueryClientProvider>



  );
}

export default App;