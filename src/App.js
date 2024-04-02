import React, {  useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';



// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Hooks 
import useAppModeEffect from './Utilities/Hooks/useAppModeEffect';

// redux
import { useSelector } from 'react-redux';
import { selectUser } from './Utilities/ReduxToolKit/features/userData/userSlice';

// react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  import StudentDetails from './components/pages/CoachTeachingSection/StudentDetails';
  import ParachuteRenewal from './components/pages/other/ParachuteRenewal';
  import ApproveStudentFlight from './components/Notifications/ApproveStudentFlight';
  import Syllabuses from './components/pages/AddFlight/Syllabuses';
  import FlightHistory from './containers/FlightHistory';
  import Club from './containers/Club';
  import ClubHistory from './components/pages/Club/ClubHistory';
  // addFlightComponents
  import AddFlight from './containers/AddFlight';
  import UploadIgc from './components/pages/AddFlight/UploadIgc';
  import AddUsedEquipment from './components/pages/AddFlight/AddUsedEquipment';
  import AddSituation from './components/pages/AddFlight/AddSituation';
  import AddTakeoff from './components/pages/AddFlight/AddTakeoff';
  import AddLanding from './components/pages/AddFlight/AddLanding';
// Student components 
  import PracticalClass from './components/pages/StudentEducation/PracticalClass';
import Settings from './containers/Settings';
import Notifications from './containers/Notifications';
import ClubEquipment from './components/pages/Club/ClubEquipment';
import ClubCoaches from './components/pages/Club/ClubCoaches';
import ClubStudents from './components/pages/Club/ClubStudents';
import RenewCertificate from './components/pages/Settings/RenewCertificate';
  




const queryClient = new QueryClient();


function App() {

          
  const {userRole} = useSelector(selectUser)
  
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
                
                {/* notifications */}
                <Route path='/notifications' element={<Notifications />} />

                {/* equipment */}
                <Route path='/equipment' element={<Equipment />} >
                    <Route index element={<FlightEquipment />} />
                    <Route path="flightEquipment" element={<FlightEquipment />} />
                    <Route path="parachute" element={<Parachute />} />
                    <Route path="harness" element={<Harness />} />
                </Route>
                <Route path='/equipment/addFlightEquipment' element={<AddFlightEquipment />} /> 
                <Route path='/equipment/addParachute' element={<AddParachute />} />
                <Route path='/equipment/addHarness' element={<AddHarness />} />

                {/* education */}
                <Route path='/education' element={<Education userRole={ userRole }  />}>
                    <Route index element={<Syllabus />} />
                    <Route path="students" element={ <Students />} />
                    <Route path="theoryClass" element={ <TheoryClass userRole={ userRole } />} />
                    <Route path="syllabus" element={<Syllabus userRole={ userRole } />} />
                </Route>
                <Route path='/education/addClass' element={<AddClass />} /> 
                <Route path='/education/StudentDetails' element={<StudentDetails/>} />
                <Route path='/ParachuteRenewal' element={<ParachuteRenewal/>} />

                {/* club */}
                <Route path='/club' element={<Club userRole={ userRole }  />}>
                    <Route index element={< ClubEquipment />} />
                    <Route path="clubEquipment" element={ < ClubEquipment />} />
                    <Route path="clubCoaches" element={ < ClubCoaches userRole={ userRole } />} />
                    <Route path="clubStudents" element={< ClubStudents userRole={ userRole } />} />
                </Route>
                <Route path='/club/clubHistory' element={<ClubHistory userRole={ userRole }  />}/>

                {/* add flight */}
                <Route path='/addFlight' element={<AddFlight userRole={ userRole } />} >
                    <Route index element={<UploadIgc />} />
                    <Route path="UploadIgc" element={ <UploadIgc />} />
                    <Route path="AddUsedEquipment" element={ <AddUsedEquipment />} />
                    <Route path="AddSituation" element={ <AddSituation userRole={ userRole } />}  />
                    <Route path="AddTakeoff" element={ <AddTakeoff />} />
                    <Route path="AddLanding" element={ <AddLanding userRole={ userRole } />} />
                </Route>
                <Route path="addFlight/syllabuses" element={ <Syllabuses />} />

                {/* flight history */}
                <Route path='/flightHistory' element={<FlightHistory userRole={ userRole } />} />

                {/* notifications */}
                <Route path='/approveStudentFlight' element={<ApproveStudentFlight />} />

                {/* settings */}
                <Route path='/Settings' element={<Settings userRole={ userRole } />} />
                <Route path='/Settings/certificate' element={<RenewCertificate />} />
                
                <Route path='*' element={<Navigate to="/profile" replace />} />

              </>
            )}

            {/* student view, rendering routes based on the rule of the user */}
            {/* many of the student components are reused and got from the coach sections */}
            {userRole === 'student' && (
              <>
              
                <Route path='/profile' element={<Profile userRole={ userRole } />} />

                {/* notifications */}
                <Route path='/notifications' element={<Notifications />} />

                {/* equipment */}
                <Route path='/equipment' element={<Equipment />} >
                    <Route index element={<FlightEquipment />} />
                    <Route path="flightEquipment" element={<FlightEquipment />} />
                    <Route path="parachute" element={<Parachute />} />
                    <Route path="harness" element={<Harness />} />
                </Route>
                <Route path='/equipment/addFlightEquipment' element={<AddFlightEquipment />} /> 
                <Route path='/equipment/addParachute' element={<AddParachute />} />
                <Route path='/equipment/addHarness' element={<AddHarness />} />

                {/* education */}
                <Route path='/education' element={<Education userRole={ userRole } />}>
                    <Route index element={<Syllabus />} />
                    <Route path="PracticalClass" element={ <PracticalClass />} />
                    <Route path="theoryClass" element={ <TheoryClass userRole={ userRole } />} />
                    <Route path="syllabus" element={<Syllabus userRole={ userRole } />} /> 
                </Route>
                <Route path='/education/StudentDetails' element={<StudentDetails/>} />
                <Route path='/ParachuteRenewal' element={<ParachuteRenewal/>} />

                {/* club */}
                <Route path='/club' element={<Club userRole={ userRole }  />}/>
                <Route path='/club/clubHistory' element={<ClubHistory userRole={ userRole }  />}/>
                
                {/* addFlight */}
                <Route path='/addFlight' element={<AddFlight userRole={ userRole } />} >
                    <Route index element={<UploadIgc />} />
                    <Route path="UploadIgc" element={ <UploadIgc />} />
                    <Route path="AddUsedEquipment" element={ <AddUsedEquipment />} />
                    <Route path="AddSituation" element={ <AddSituation userRole={ userRole } />} />
                    <Route path="AddTakeoff" element={ <AddTakeoff />} />
                    <Route path="AddLanding" element={ <AddLanding userRole={ userRole } />} />
                </Route>

                {/* flight history */}
                <Route path='/flightHistory' element={<FlightHistory userRole={ userRole } />} />

                {/* settings */}
                <Route path='/Settings' element={<Settings userRole={ userRole }  />} />
                <Route path='/Settings/certificate' element={<RenewCertificate />} />
                
                <Route path='*' element={<Navigate to="/profile" replace />} />

              </>
            )}

            </Routes>
          <Footer />
          <ToastContainer/>
        </div>

      </QueryClientProvider>



  );
}

export default App;