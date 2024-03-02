import React, {  useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

// dark and light mode

// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Hooks 
import useAppModeEffect from './Utilities/Hooks/useAppModeEffect';


// main and caoch components
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
import Education from './containers/Education';
import Syllabus from './components/pages/CoachTeachingSection/Syllabus';
import Students from './components/pages/CoachTeachingSection/Students';
import TheoryClass from './components/pages/CoachTeachingSection/TheoryClass';
import AddClass from './components/pages/CoachTeachingSection/AddClass';
import ClassDetails from './components/pages/CoachTeachingSection/ClassDetails';
import StudentDetails from './components/pages/CoachTeachingSection/StudentDetails';
import ParachuteRenewal from './components/pages/other/ParachuteRenewal';
import PracticalClass from './components/pages/StudentEducation/PracticalClass';
  // Student components 




const queryClient = new QueryClient();


function App() {

  const [userRole, setUserRole] = useState('student');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useAppModeEffect(isDarkMode)
 

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };


  
  return (
      <QueryClientProvider client={queryClient}>

        <div className="App ">
          <Navbar toggleTheme={toggleTheme}  />
            <Routes>

            {/* coach view, rendering routes based on the rule of the user */}
            {userRole === 'coach' && (
              <>
              
                <Route path='/profile' element={<Profile userRole={ userRole } />} />


                <Route path='/equipment' element={<Equipment />} >
                    <Route index element={<FlightEquipment />} />
                    <Route path="flightEquipment" element={<FlightEquipment />} />
                    <Route path="parachute" element={<Parachute />} />
                    <Route path="harness" element={<Harness />} />
                </Route>
                <Route path='/equipment/addFlightEquipment' element={<AddFlightEquipment />} /> 
                <Route path='/equipment/addParachute' element={<AddParachute />} />
                <Route path='/equipment/addHarness' element={<AddHarness />} />

                <Route path='/education' element={<Education userRole={ userRole }  />}>
                    <Route index element={<Syllabus />} />
                    <Route path="students" element={ <Students />} />
                    <Route path="theoryClass" element={ <TheoryClass userRole={ userRole } />} />
                    <Route path="syllabus" element={<Syllabus userRole={ userRole } />} />
                </Route>
                <Route path='/education/addClass' element={<AddClass />} /> 
                <Route path='/education/ClassDetails' element={<ClassDetails />} /> 
                <Route path='/education/StudentDetails' element={<StudentDetails/>} />
                <Route path='/ParachuteRenewal' element={<ParachuteRenewal/>} />
                
                <Route path='*' element={<Navigate to="/profile" replace />} />

              </>
            )}

            {/* student view, rendering routes based on the rule of the user */}
            {/* many of the student components are reused and got from the coach sections */}
            {userRole === 'student' && (
              <>
              
                <Route path='/profile' element={<Profile userRole={ userRole } />} />


                <Route path='/equipment' element={<Equipment />} >
                    <Route index element={<FlightEquipment />} />
                    <Route path="flightEquipment" element={<FlightEquipment />} />
                    <Route path="parachute" element={<Parachute />} />
                    <Route path="harness" element={<Harness />} />
                </Route>
                <Route path='/equipment/addFlightEquipment' element={<AddFlightEquipment />} /> 
                <Route path='/equipment/addParachute' element={<AddParachute />} />
                <Route path='/equipment/addHarness' element={<AddHarness />} />

                <Route path='/education' element={<Education userRole={ userRole } />}>
                    <Route index element={<Syllabus />} />
                    <Route path="PracticalClass" element={ <PracticalClass />} />
                    <Route path="theoryClass" element={ <TheoryClass userRole={ userRole } />} />
                    <Route path="syllabus" element={<Syllabus userRole={ userRole } />} /> 
                </Route>
                <Route path='/education/ClassDetails' element={<ClassDetails />} /> 
                <Route path='/education/StudentDetails' element={<StudentDetails/>} />
                <Route path='/ParachuteRenewal' element={<ParachuteRenewal/>} />
                
                <Route path='*' element={<Navigate to="/profile" replace />} />

              </>
            )}

            </Routes>
          <Footer />
        </div>

      </QueryClientProvider>



  );
}

export default App;