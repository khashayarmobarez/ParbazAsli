import React, {  useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// api
import { postIsUserAuthenticated } from './Utilities/Services/AuthenticationApi';

// styles
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

// landing and overall section
  import LandingPage from './containers/LandingPage';
  import FooterLanding from './components/pages/LandingPageComponents/FooterLanding';
  import AboutUs from './containers/AboutUs';
  import ContactUs from './containers/ContactUs';
  import Blogs from './containers/Blogs';
  import BlogDetails from './components/pages/Blogs/BlogDetails';
  import WhyUs from './components/pages/LandingPageComponents/WhyUs';
// not validated user component
  import AddEmail from './components/pages/authentication/incomplete user Info pages/AddEmail';
  import AddCertificate from './components/pages/authentication/incomplete user Info pages/AddCertificate';
  import AdminPending from './components/pages/authentication/incomplete user Info pages/AdminPending';
// main and caoch components
  import Footer from './components/Footer/Footer';
  import Navbar from './components/Header/Navbar';
  import SignUpOrLogin from './components/pages/authentication/SignUpOrLogin';
  import Profile from './containers/Profile';
  import Equipment from './containers/Equipment';
  import FlightEquipment from './components/pages/Equipment page comps/FlightEquipment';
  import AddFlightEquipment from './components/pages/Equipment page comps/AddFlightEquipment';
  import Parachute from './components/pages//Equipment page comps/Parachute'
  import Harness from './components/pages//Equipment page comps/Harness'
  import AddParachute from './components/pages/Equipment page comps/AddParachute';
  import AddHarness from './components/pages/Equipment page comps/AddHarness';
// education
  import Education from './containers/Education';
  import AddCourse from './components/pages/Education/AddCourse';
  import StudentDetails from './components/pages/Education/StudentDetails';
  import ApproveStudentFlight from './components/Notifications/ApproveStudentFlight';
  import Syllabuses from './components/pages/AddFlight/Syllabuses';
  import FlightHistory from './containers/FlightHistory';
  import Club from './containers/Club';
  import ClubHistory from './components/pages/Club/ClubHistory';
  import EditProfile from './containers/EditProfile';
  import ChangeProfile from './components/pages/Profile/EditProfile/ChangeProfile';
  import ChangeCertificate from './components/pages/Profile/EditProfile/ChangeCertificate';
  import ChangeCoach from './components/pages/Profile/EditProfile/ChangeCoach';
// addFlightComponents
  import AddFlight from './containers/AddFlight';
    import UploadIgc from './components/pages/AddFlight/UploadIgc';
    import AddUsedEquipment from './components/pages/AddFlight/AddUsedEquipment';
    import AddSituation from './components/pages/AddFlight/AddSituation';
    import AddTakeoff from './components/pages/AddFlight/AddTakeoff';
    import AddLanding from './components/pages/AddFlight/AddLanding';
// Student components 
  import Settings from './containers/Settings';
  import Notifications from './containers/Notifications';
  import ClubEquipment from './components/pages/Club/ClubEquipment';
  import ClubCoaches from './components/pages/Club/ClubCoaches';
  import ClubStudents from './components/pages/Club/ClubStudents';
  import RenewCertificate from './components/pages/Settings/RenewCertificate';
// organization components
  import OrganDashboard from './containers/OrganDashboard';
  import OrganCoaches from './containers/OrganCoaches';
  import OrganPilots from './containers/OrganPilots';
  import PilotsHistory from './components/pages/Organization/PilotsHistory';
  import CoachHistory from './components/pages/Organization/CoachHistory';
import EditEquipment from './components/pages/Equipment page comps/Edit, renew Equipment/EditEquipment';
import PossessionTransitionEquipment from './components/pages/Equipment page comps/PossessionTransitionEquipment';
import CourseDetails from './components/pages/Education/CourseDetails';
import CourseStudents from './components/pages/Education/CourseDetailPages/CourseStudents';
import CourseClasses from './components/pages/Education/CourseDetailPages/CourseClasses';
import CourseSyllabi from './components/pages/Education/CourseDetailPages/CourseSyllabi';
import AddClass from './components/pages/Education/CourseDetailPages/AddClass';
import MyCourses from './containers/MyCourses';
import MyCourseDetails from './components/pages/MyCourses/MyCourseDetails';
import PracticalMyCourse from './components/pages/MyCourses/MyCourseDetailPages/PracticalMyCourse';
import TheoryMyCourse from './components/pages/MyCourses/MyCourseDetailPages/TheoryMyCourse';
import MySyllabiMyCourse from './components/pages/MyCourses/MyCourseDetailPages/MySyllabiMyCourse';
import AddFlightType from './components/pages/AddFlight/AddFlightType';
import FlightsAdvancedFilter from './components/pages/FlightHistory/FlightsAdvancedFilter';
  



const queryClient = new QueryClient();


function App() {

  const token = Cookies.get('token') || null;

  // is user authenticated could be, authenticated, false, noEmail, noCertificate, noAdminApprovment
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const {userRole} = useSelector(selectUser)

  const location = useLocation();

  const navigate = useNavigate()

  const [isDarkMode, setIsDarkMode] = useState(true);

  // State to reload the page after authentication to rerender the components correctlu
  // This is a workaround to fix a bug that when user is logged in the components won't rerender until the page is reloaded
  const [isPageReloaded, setIsPageReloaded] = useState(false);

  useAppModeEffect(isDarkMode)

  // Check if user is authenticated
  useEffect(() => {
    const checkUserAuthentication = async () => {
      const isAuthenticated = await Cookies.get('isUserAuthenticated') || 'false';
      setIsUserAuthenticated(isAuthenticated);
    };

    checkUserAuthentication();
  }, []);


  // Reload the page after authentication to rerender the components correctly 
  // This is a workaround to fix a bug that when user is logged in the components won't rerender until the page is reloaded
  useEffect(() => {
    if (isPageReloaded) {
      setTimeout(() => {
        window.location.reload();
        setIsPageReloaded(false); // Reset state after reload
      }, 50); // (50 milliseconds)
    }
  }, [isPageReloaded]);
          
  // Check if user is authenticated
  useEffect(() => {
    if (token) {
      postIsUserAuthenticated(token, navigate, isUserAuthenticated, setIsPageReloaded);
    }
  }, [token, navigate, isUserAuthenticated]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };


  return (
    <QueryClientProvider client={queryClient}>

      <div className={`App ${token && 'pb-24'} `}>
        <Navbar toggleTheme={toggleTheme} userRole={ userRole } />
          <Routes>

          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path='/contactUs' element={<ContactUs />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blog/:id' element={<BlogDetails />} />
          <Route path='/whyUs' element={<WhyUs />} />
          


          {/* landing page */}
          {!token &&
          <>
            <Route path='/signUpLogin' element={<SignUpOrLogin />} />
            <Route path='/' element={<LandingPage />} />
            <Route path='*' element={<Navigate to="/" />} />
          </>
          }

          {/* add email, certificate and admin approval routes */}
            {token && isUserAuthenticated === 'noEmail' &&
            <>
              <Route path='/addEmail' element={<AddEmail />} />
              <Route path='*' element={<Navigate to="/addEmail" replace />} />
            </> 
            }

            {token  && isUserAuthenticated === 'noCertificate' &&
            <>
              <Route path='/addCertificate' element={<AddCertificate />} />
              <Route path='*' element={<Navigate to="/addCertificate" replace />} />
            </> 
            }

            {token  && isUserAuthenticated === 'noAdminApprovment' &&
            <>
              <Route path='/adminPending' element={<AdminPending />} />
              <Route path='*' element={<Navigate to="/adminPending" replace />} />
            </> 
            }



          {/* same components for coach and student  */}
            {token  && isUserAuthenticated === 'authenticated' && (
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
                <Route path='/EditEquipment/:id' element={<EditEquipment />} />
                <Route path='/possessionTransitionEquipment/:id' element={<PossessionTransitionEquipment />} />

                {/* education */}
                <Route path='/education' element={<Education userRole={ userRole }  />} />
                <Route path='/education/addClass' element={<AddCourse />} /> 
                <Route path='/education/courseDetails/:id' element={<CourseDetails />} >
                  <Route index element={<CourseStudents />} />
                  <Route path="students" element={<CourseStudents />} />
                  <Route path="classes" element={<CourseClasses />} />
                  <Route path="syllabi" element={<CourseSyllabi />} />
                </Route> 
                <Route path='/education/:id/AddClass' element={<AddClass/>} />
                <Route path='/education/StudentDetails' element={<StudentDetails/>} />

                {/* my courses */}
                <Route path='/MyCourses' element={<MyCourses  />} />
                <Route path='/MyCourses/courseDetails/:id' element={<MyCourseDetails />} >
                  <Route index element={<PracticalMyCourse />} />
                  <Route path="practical" element={<PracticalMyCourse />} />
                  <Route path="theory" element={<TheoryMyCourse />} />
                  <Route path="mySyllabi" element={<MySyllabiMyCourse />} />
                </Route>

                {/* add flight */}
                <Route path="/addFlight/AddFlightType" element={ <AddFlightType />} />
                <Route path='/addFlight' element={<AddFlight userRole={ userRole } />} >
                    <Route index element={<UploadIgc />} />
                    <Route path="UploadIgc" element={ <UploadIgc />} />
                    <Route path="AddUsedEquipment" element={ <AddUsedEquipment />} />
                    <Route path="AddSituation" element={ <AddSituation />}  />
                    <Route path="AddTakeoff" element={ <AddTakeoff />} />
                    <Route path="AddLanding" element={ <AddLanding userRole={ userRole } />} />
                </Route>
                <Route path="addFlight/syllabuses" element={ <Syllabuses />} />

                {/* flight history */}
                <Route path='/flightHistory' element={<FlightHistory  />} />
                <Route path='/flightHistory/advancedFilter' element={<FlightsAdvancedFilter  />} />


                {/* edit profile */}
                <Route path='/editProfile' element={<EditProfile />}>
                    <Route index element={<ChangeProfile />} />
                    <Route path="changeProfile" element={<ChangeProfile />} />
                    <Route path="changeCertificate" element={<ChangeCertificate />} />
                    <Route path="changeCoach" element={<ChangeCoach />} />
                </Route>

                {/* profile */}
                <Route path='*' element={<Navigate to="/profile" replace />} />

              </>
            )}


          {/* coach view, rendering routes based on the rule of the user */}
          {/* {userRole === 'coach' && ( */}
          {token && isUserAuthenticated === 'authenticated' &&  (
            <>

              {/* club */}
              <Route path='/club' element={<Club userRole={ userRole }  />}>
                  <Route index element={< ClubEquipment />} />
                  <Route path="clubEquipment" element={ < ClubEquipment />} />
                  <Route path="clubCoaches" element={ < ClubCoaches userRole={ userRole } />} />
                  <Route path="clubStudents" element={< ClubStudents userRole={ userRole } />} />
              </Route>
              <Route path='/club/clubHistory' element={<ClubHistory userRole={ userRole }  />}/>

              {/* notifications */}
              <Route path='/approveStudentFlight' element={<ApproveStudentFlight />} />

              {/* settings */}
              <Route path='/Settings' element={<Settings userRole={ userRole } />} />
              <Route path='/Settings/certificate' element={<RenewCertificate />} />

            </>
          )}

          {/* student view, rendering routes based on the rule of the user */}
          {/* many of the student components are reused and got from the coach sections */}
          {userRole === 'student' && isUserAuthenticated === 'authenticated' &&  (
            <>


              {/* education */}
              <Route path='/education' element={<Education userRole={ userRole } />}/>
              <Route path='/education/StudentDetails' element={<StudentDetails/>} />

              {/* club */}
              <Route path='/club' element={<Club userRole={ userRole }  />}/>
              <Route path='/club/clubHistory' element={<ClubHistory userRole={ userRole }  />}/>

              {/* settings */}
              <Route path='/Settings' element={<Settings userRole={ userRole }  />} />
              <Route path='/Settings/certificate' element={<RenewCertificate />} />

            </>
          )}

          {/* organization login specific */}
          {userRole === 'organization' && isUserAuthenticated === 'authenticated' &&  (
            <>
              <Route path='/organizationDashboard' element={<OrganDashboard  />} />

              <Route path='/organizationCoaches' element={<OrganCoaches  />} />
              <Route path='/organizationCoaches/coachHistory' element={<CoachHistory  />} />
              
              <Route path='/organizationPilots' element={<OrganPilots  />} />
              <Route path='/organizationPilots/PilotsHistory' element={<PilotsHistory  />} />

              <Route path='*' element={<Navigate to="/organizationDashboard" replace />} />
            </>
          )}

          </Routes>
        
        {/* footer section */}
        {/* based on if the user is signed in or not */}
        {!token && <FooterLanding /> }
        <Footer userRole = { userRole } />

        <ToastContainer/>                                                                                                                                                                                                                                                                      <p className=' absolute -z-10 text-[#000000]/0'>front end developed by khashayar mobarez</p>
        
      </div>

    </QueryClientProvider>

  );
}

export default App;