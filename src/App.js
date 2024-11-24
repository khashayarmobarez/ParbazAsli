import React, {  useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// hotjar
import Hotjar from '@hotjar/browser';


// api
import { postIsUserAuthenticated } from './Utilities/Services/AuthenticationApi';

// styles
import './App.css';

// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Hooks 
import useAppModeEffect from './Utilities/Hooks/useAppModeEffect';
import { useTheme } from './Utilities/Hooks/useTheme';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './Utilities/ReduxToolKit/features/userData/userSlice';

// react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// not validated user component
  import AddEmail from './templates/Authentication/AddEmail';
  import AddCertificate from './templates/Authentication/AddCertificate';
  import AdminPending from './templates/Authentication/AdminPending';
// main and coach components
  import Footer from './templates/Footer';
  import Navbar from './templates/Navbar';
  import SignUpOrLogin from './templates/Authentication/SignUpOrLogin';
  import Profile from './templates/profile/Profile';
  import Equipment from './templates/Equipment';
  import FlightEquipment from './components/pages/Equipment page comps/FlightEquipment';
  import AddFlightEquipment from './components/pages/Equipment page comps/AddFlightEquipment';
  import Parachute from './components/pages//Equipment page comps/Parachute'
  import Harness from './components/pages//Equipment page comps/Harness'
  import AddParachute from './components/pages/Equipment page comps/AddParachute';
  import AddHarness from './components/pages/Equipment page comps/AddHarness';
// education
  import Education from './templates/Education';
  import AddCourse from './components/pages/Education/AddCourse';
  import StudentDetails from './components/pages/Education/StudentDetails';
  import ApproveStudentFlight from './templates/notifications/ApproveStudentFlight';
  import Syllabuses from './templates/notifications/Syllabuses';
  import FlightHistory from './templates/FlightHistory';
  import Club from './templates/Club';
  import EditProfile from './templates/profile/EditProfile';
  import ChangeProfile from './templates/profile/ChangeProfile';
  import ChangeCertificate from './templates/profile/ChangeCertificate';
// addFlightComponents
  import AddFlight from './templates/AddFlight';
    import UploadIgc from './components/pages/AddFlight/UploadIgc';
    import AddUsedEquipment from './components/pages/AddFlight/AddUsedEquipment';
    import AddSituation from './components/pages/AddFlight/AddSituation';
    import AddTakeoff from './components/pages/AddFlight/AddTakeoff';
    import AddLanding from './components/pages/AddFlight/AddLanding';
// Student components 
  import Settings from './templates/Settings';
  import Notifications from './templates/notifications/Notifications';
  import RenewCertificate from './components/pages/Settings/RenewCertificate';
import EditEquipment from './components/pages/Equipment page comps/Edit, renew Equipment/EditEquipment';
import PossessionTransitionEquipment from './components/pages/Equipment page comps/PossessionTransitionEquipment';
import CourseDetails from './components/pages/Education/CourseDetails';
import CourseStudents from './components/pages/Education/CourseDetailPages/CourseStudents';
import CourseClasses from './components/pages/Education/CourseDetailPages/CourseClasses';
import CourseSyllabi from './components/pages/Education/CourseDetailPages/CourseSyllabi';
import AddClass from './components/pages/Education/CourseDetailPages/AddClass';
import MyCourses from './templates/MyCourses';
import MyCourseDetails from './components/pages/MyCourses/MyCourseDetails';
import PracticalMyCourse from './components/pages/MyCourses/MyCourseDetailPages/PracticalMyCourse';
import TheoryMyCourse from './components/pages/MyCourses/MyCourseDetailPages/TheoryMyCourse';
import MySyllabiMyCourse from './components/pages/MyCourses/MyCourseDetailPages/MySyllabiMyCourse';
import AddFlightType from './components/pages/AddFlight/AddFlightType';
import FlightsAdvancedFilter from './components/pages/FlightHistory/FlightsAdvancedFilter';
import ClubCoaches from './components/pages/Club/ClubCoaches';
import ClubEquipment from './components/pages/Club/ClubEquipment';
import ClubCourses from './components/pages/Club/clubCourses/ClubCourses';
import ClubFlightEquipments from './components/pages/Club/clubEquipments/ClubFlightEquipments';
import ClubParachutes from './components/pages/Club/clubEquipments/ClubParachutes';
import ClubHarnesses from './components/pages/Club/clubEquipments/ClubHarnesses';
import ClubCoachDetails from './components/pages/Club/ClubCoachDetails';
import AddClubCourse from './components/pages/Club/clubCourses/AddClubCourse';
import AddClubFlightEquipment from './components/pages/Club/clubEquipments/AddClubFlightEquipment';
import AddClubParachute from './components/pages/Club/clubEquipments/AddClubParachute';
import AddClubHarness from './components/pages/Club/clubEquipments/AddClubHarness';
import TandemSurvey from './templates/TandemSurvey';
import SyllabiList from './templates/SyllabiList';
import FlightHistoryPage from './components/pages/FlightHistory/FlightHistoryPage';
import EditClubEquipment from './components/pages/Club/clubEquipments/club equipment details/EditClubEquipment';
import PossessionTransitionClub from './components/pages/Club/clubEquipments/club equipment details/PossessionTransitionClub';
import ClubCourseDetails from './components/pages/Club/clubCourses/ClubCourseDetails';
import ClubCourseStudents from './components/pages/Club/clubCourses/ClubCourseStudents';
import ClubCourseClasses from './components/pages/Club/clubCourses/ClubCourseClasses';
import ClubCourseSyllabi from './components/pages/Club/clubCourses/ClubCourseSyllabi';
import MyGuestClassDetails from './components/pages/MyCourses/MyGuestClassDetails';
import ClubCourseStudentDetails from './components/pages/Club/clubCourseStudentDetails/ClubStudentDetails';
import ClubCourseStudentPracticalDetails from './components/pages/Club/clubCourseStudentDetails/ClubCourseStudentPracticalDetails';
import ClubCourseStudentTheoryDetails from './components/pages/Club/clubCourseStudentDetails/ClubCourseStudentTheoryDetails';
import ClubCourseStudentSyllabiDetails from './components/pages/Club/clubCourseStudentDetails/ClubCourseStudentSyllabiDetails';
import ClubCourseStudentAFlightDetails from './components/pages/Club/clubCourseStudentDetails/ClubCourseStudentAFlightDetails';
import CourseStudentDetails from './components/pages/Education/courseStudentDetails/CourseStudentDetails';
import CourseStudentPracticalDetails from './components/pages/Education/courseStudentDetails/CourseStudentPracticalDetails';
import CourseStudentTheoryDetails from './components/pages/Education/courseStudentDetails/CourseStudentTheoryDetails';
import CourseStudentSyllabiDetails from './components/pages/Education/courseStudentDetails/CourseStudentSyllabiDetails';
import CourseStudentAFlightDetails from './components/pages/Education/courseStudentDetails/CourseStudentAFlightDetails';
import SyllabiDetails from './components/pages/SyllabiList/SyllabiDetails';
import StudentsList from './components/pages/Education/studentsList/StudentsList';
import StudentsListClub from './components/pages/Club/clubCourses/studentsListClub/StudentsListClub';
import AStudentCourses from './components/pages/Education/studentsList/AStudentCourses';
import AStudentClubCourses from './components/pages/Club/clubCourses/studentsListClub/AStudentClubCourses';
  



const queryClient = new QueryClient();


function App() {

  const siteId = 5139806;
  const hotjarVersion = 6;

  
  Hotjar.init(siteId, hotjarVersion);

  const token = Cookies.get('token') || null;
  const userInput = Cookies.get('userInput') || null;

  useTheme();


  // hotjar
  if(token) {
    Hotjar.identify(userInput, {
      userInput: userInput,   
    });
  }

  // is user authenticated could be, authenticated, false, noEmail, noCertificate, noAdminApprovment
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const {userRole} = useSelector(selectUser)

  const location = useLocation();

  const navigate = useNavigate()

  // State to reload the page after authentication to rerender the components correctlu
  // This is a workaround to fix a bug that when user is logged in the components won't rerender until the page is reloaded
  const [isPageReloaded, setIsPageReloaded] = useState(false);

  useAppModeEffect(true)

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
      }, 50); // (500 milliseconds)
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



  return (
    <QueryClientProvider client={queryClient}>

      <div className={`App ${token && 'pb-24'} `}>
        <Navbar />
          <Routes>

          {/* tandem flight survey, for passenger */}
          <Route path="/survey/:id" element={ <TandemSurvey />} />

          {/* landing page */}
          {!token &&
          <>
            {/* <Route path='/LandingPage' element={<LandingPage />} /> */}
            <Route path='/signUp' element={<SignUpOrLogin />} />
            <Route path='/login' element={<SignUpOrLogin />} />
            <Route path='*' element={<Navigate to="/login" replace />} />
          </>
          }

          {token &&
          <>
            {/* notifications */}
            <Route path='/notifications' element={<Notifications />} />
          </>
          }

          {/* add email, certificate and admin approval routes */}
          {token && isUserAuthenticated === 'noEmail' && (
            <>
              <Route path='/addEmail' element={<AddEmail />} />
              <Route path='*' element={<Navigate to="/addEmail" replace />} />
            </>
          )}


          {
            token && isUserAuthenticated === 'noCertificate' && (
              <>
                <Route path='/addCertificate' element={<AddCertificate />} />
                <Route path='*' element={<Navigate to="/addCertificate" replace />} />
              </>
            )
          }

          {/* user pages */}
          {token && isUserAuthenticated === 'noAdminApprovment' && (
            <>
              <Route path='/adminPending' element={<AdminPending />} />
              <Route path='*' element={<Navigate to="/adminPending" replace />} />
            </>
          )}

          {
            token && (isUserAuthenticated === 'noEmail' || isUserAuthenticated === 'noCertificate' || isUserAuthenticated === 'noAdminApprovment') && 
            (
              // edit profile
              <Route path='/editProfile' element={<EditProfile />} >
                <Route index element={<ChangeProfile />} />
                <Route path="changeProfile" element={<ChangeProfile />} />
                <Route path="changeCertificate" element={<ChangeCertificate />} />
              </Route>
            )
          }

          {token && isUserAuthenticated === 'authenticated' && (
            <>
              <Route path='/profile' element={<Profile userRole={ userRole } />} />

              {/* notifications */}
              <Route path='/notifications' element={<Notifications />} />
              {/* notifications for the coach after student added*/}
              <Route path="/addFlight/ReviewStudentsFlight/:id" element={ <ApproveStudentFlight />} />
              <Route path="/addFlight/ReviewStudentsFlight/:flightId/syllabuses/:courseId" element={ <Syllabuses />} />

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
              <Route path='/education/StudentDetails/:id' element={<StudentDetails/>} />
              <Route path='/education/courseDetails/studentDetails/:studentId' element={<CourseStudentDetails />} >
                <Route index element={<CourseStudentPracticalDetails />} />
                <Route path="practical" element={<CourseStudentPracticalDetails />} />
                <Route path="theory" element={<CourseStudentTheoryDetails />} />
                <Route path="syllabi" element={<CourseStudentSyllabiDetails />} />
              </Route>
              <Route path='/education/courseDetails/studentDetails/aStudentFlight/:flightId' element={<CourseStudentAFlightDetails />} />
              {/* id 1 is for active students and id 2 is for history student */}
              <Route path='/education/studentsList/:id' element={<StudentsList />} />
              <Route path='/education/studentsList/aStudentCourses/:studentId' element={<AStudentCourses />} />

              {/* my courses */}
              <Route path='/MyCourses' element={<MyCourses  />} />
              <Route path='/MyCourses/courseDetails/:id' element={<MyCourseDetails />} >
                {/* <Route index element={<PracticalMyCourse />} /> */}
                <Route path="practical" element={<PracticalMyCourse />} />
                <Route path="theory" element={<TheoryMyCourse />} />
                <Route path="mySyllabi" element={<MySyllabiMyCourse />} />
              </Route>
              <Route path='/MyCourses/guestClassDetails/:id' element={<MyGuestClassDetails />} />

              {/* syllabi list */}
              <Route path='/syllabi' element={<SyllabiList  />} /> 
              <Route path='/syllabi/details/:id' element={<SyllabiDetails  />} /> 

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


              {/* flight history */}
              <Route path='/flightHistory' element={<FlightHistory  />} />
              <Route path='/flightHistory/advancedFilter' element={<FlightsAdvancedFilter  />} />
              <Route path='/flightHistory/:id' element={<FlightHistoryPage  />} />


              {/* club */}
              <Route path='/club' element={<Club  />} />
              <Route path="/club/clubEquipment" element={ < ClubEquipment />} >
                  <Route index element={<ClubFlightEquipments />} />
                  <Route path="flightEquipments" element={<ClubFlightEquipments />} />
                  <Route path="parachutes" element={<ClubParachutes />} />
                  <Route path="harnesses" element={<ClubHarnesses />} />
              </Route >
              <Route path='/club/addFlightEquipmentForClub' element={<AddClubFlightEquipment />} /> 
              <Route path='/club/addParachuteForClub' element={<AddClubParachute />} />
              <Route path='/club/addHarnessForClub' element={<AddClubHarness />} />
              <Route path="/club/clubCoaches" element={ < ClubCoaches  />} />
              <Route path="/club/coachDetails/:id" element={ < ClubCoachDetails />} />
              <Route path='/EditClubEquipment/:id' element={<EditClubEquipment />} />
              <Route path='/possessionTransitionEquipmentClub/:id' element={<PossessionTransitionClub />} />
              {/* club education */}
              <Route path="/club/clubCourses" element={ < ClubCourses  />} />
              <Route path="/club/addCourseToClub" element={ < AddClubCourse  />} />
              <Route path='/club/courseDetails/:id' element={<ClubCourseDetails />} >
                <Route index element={<ClubCourseStudents />} />
                <Route path="students" element={<ClubCourseStudents />} />
                <Route path="classes" element={<ClubCourseClasses />} />
                <Route path="syllabi" element={<ClubCourseSyllabi />} />
              </Route> 
              <Route path='/club/courseDetails/studentDetails/:studentId' element={<ClubCourseStudentDetails />} >
                <Route index element={<ClubCourseStudentPracticalDetails />} />
                <Route path="practical" element={<ClubCourseStudentPracticalDetails />} />
                <Route path="theory" element={<ClubCourseStudentTheoryDetails />} />
                <Route path="syllabi" element={<ClubCourseStudentSyllabiDetails />} />
              </Route>
              <Route path='/club/courseDetails/studentDetails/aStudentFlight/:flightId' element={<ClubCourseStudentAFlightDetails />} />
              {/* id 1 is for active students and id 2 is for history student */}
              <Route path='/club/clubCourses/studentsListClub/:id' element={<StudentsListClub />} />
              <Route path='/club/clubCourses/studentsListClub/aStudentClubCourses/:studentId' element={<AStudentClubCourses />} />


              {/* edit profile */}
              <Route path='/editProfile' element={<EditProfile />}>
                  <Route index element={<ChangeProfile />} />
                  <Route path="changeProfile" element={<ChangeProfile />} />
                  <Route path="changeCertificate" element={<ChangeCertificate />} />
              </Route>

              {/* profile */}
              <Route path='*' element={<Navigate to="/profile" replace />} />

              {/* settings */}
              <Route path='/Settings' element={<Settings />} />
              <Route path='/Settings/certificate' element={<RenewCertificate />} />

            </>
          )}

          

          {/* organization login specific */}
          {/* {token && userRole === 'organization' (
            <>
              <Route path='/organization' element={<OrganDashboard  />} >
                  <Route index element={<OrgansData />} />
                  <Route path="OrgansData" element={<OrgansData />} />
                  <Route path="OrgansUsersData" element={<OrgansUsersData />} />
              </Route>

              <Route path='/organizationCoaches' element={<OrganCoaches  />} />
              <Route path='/organizationCoaches/coachHistory' element={<CoachHistory  />} />
              
              <Route path='/organizationPilots' element={<OrganPilots  />} />
              <Route path='/organizationPilots/PilotsHistory' element={<PilotsHistory  />} />

              <Route path='*' element={<Navigate to="/organization/OrgansData" replace />} />
            </>
          )} */}

          </Routes>                                                                                                                                                                                                                                                                                         <p className=' absolute -z-10 text-[#000000]/0'>front end developed by khashayar mobarez</p>
          
        
        {/* footer section */}
        {/* based on if the user is signed in or not */}
        <Footer userRole = { userRole } />
        {/* {!token && 
          <>
            <FooterLanding /> 
          </>
        } */}

        <ToastContainer/>                                                                                                                                                                                                                                                                      
      </div>

    </QueryClientProvider>

  );
}

export default App;