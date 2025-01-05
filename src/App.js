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
import { useSelector } from 'react-redux';
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
  import SignUpOrLogin from './templates/Authentication/SignUpOrLogin';
  import Profile from './templates/profile/Profile';
  import Equipment from './templates/equipments/Equipment';
// education
  import Education from './templates/education/Education';
  import AddCourse from './templates/education/AddCourse';
  import StudentDetails from './templates/education/studentList/StudentDetails';
  import ApproveStudentFlight from './templates/notifications/ApproveStudentFlight';
  import Syllabuses from './templates/notifications/Syllabuses';
  import FlightHistory from './templates/flightHistory/FlightHistory';
  import Club from './templates/club/Club';
  import EditProfile from './templates/profile/EditProfile';
  import ChangeProfile from './templates/profile/ChangeProfile';
  import ChangeCertificate from './templates/profile/ChangeCertificate';
// addFlightComponents  
  import AddFlight from './templates/addFlight/AddFlight';
    import UploadIgc from './templates/addFlight/UploadIgc';
    import AddUsedEquipment from './templates/addFlight/AddUsedEquipment';
    import AddSituation from './templates/addFlight/AddSituation';
    import AddTakeoff from './templates/addFlight/AddTakeoff';
    import AddLanding from './templates/addFlight/AddLanding';
// Student components 
  import Settings from './templates/settings/Settings';
  import Notifications from './templates/notifications/Notifications';
  import AddNewCertificate from './templates/settings/AddNewCertificate';
import EditEquipment from './templates/equipments/EditEquipment';
import PossessionTransitionEquipment from './templates/equipments/PossessionTransitionEquipment';
import CourseDetails from './templates/education/CourseDetails';
import CourseStudents from './templates/education/CourseDetailPages/CourseStudents';
import CourseClasses from './templates/education/CourseDetailPages/CourseClasses';
import CourseSyllabi from './templates/education/CourseDetailPages/CourseSyllabi';
import AddClass from './templates/education/CourseDetailPages/AddClass';
import MyCourses from './templates/myCourses/MyCourses';
import MyCourseDetails from './templates/myCourses/MyCourseDetails';
import PracticalMyCourse from './templates/myCourses/PracticalMyCourse';
import TheoryMyCourse from './templates/myCourses/TheoryMyCourse';
import MySyllabiMyCourse from './templates/myCourses/MySyllabiMyCourse';
import AddFlightType from './templates/addFlight/AddFlightType';
import FlightsAdvancedFilter from './templates/flightHistory/FlightsAdvancedFilter';
import ClubCoaches from './templates/club/clubCoaches/ClubCoaches';
import ClubEquipment from './templates/club/clubEquipments/ClubEquipment';
import ClubCoachDetails from './templates/club/clubCoaches/ClubCoachDetails';
import TandemSurvey from './templates/TandemSurvey';
import SyllabiList from './templates/syllabiList/SyllabiList';
import FlightHistoryPage from './templates/flightHistory/FlightHistoryPage';
import ClubCourseSyllabi from './templates/club/clubEducation/ClubCourseSyllabi';
import MyGuestClassDetails from './templates/myCourses/MyGuestClassDetails';
import ClubCourseStudentDetails from './templates/club/students/ClubStudentDetails';
import ClubCourseStudentPracticalDetails from './templates/club/students/ClubCourseStudentPracticalDetails';
import ClubCourseStudentTheoryDetails from './templates/club/students/ClubCourseStudentTheoryDetails';
import ClubCourseStudentSyllabiDetails from './templates/club/students/ClubCourseStudentSyllabiDetails';
import ClubCourseStudentAFlightDetails from './templates/education/studentList/CourseStudentAFlightDetails';
import CourseStudentDetails from './templates/education/studentList/CourseStudentDetails';
import CourseStudentPracticalDetails from './templates/education/studentList/CourseStudentPracticalDetails';
import CourseStudentTheoryDetails from './templates/education/studentList/CourseStudentTheoryDetails';
import CourseStudentSyllabiDetails from './templates/education/studentList/CourseStudentSyllabiDetails';
import CourseStudentAFlightDetails from './templates/education/studentList/CourseStudentAFlightDetails';
import SyllabiDetails from './templates/syllabiList/SyllabiDetails';
import StudentsList from './templates/education/studentList/StudentsList';
import AStudentCourses from './templates/education/studentList/AStudentCourses';
import AddEquipment from './templates/equipments/AddEquipment';
import EquipmentsList from './templates/equipments/EquipmentsList';
import Navbar from './templates/Navbar';
import RenewCertificate from './templates/settings/RenewCertificate';


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
  }                                                                                                                                                                                                       Cookies.set('app_front-end_Developer', 'khashayar_mobarez_haghighi', { expires: 7, domain: '.digilogbook.app' });Cookies.set('app_back-end_Developer', 'hesam_javadi', { expires: 7, domain: '.digilogbook.app' });Cookies.set('app_ui/ux_designer', 'sheida_rahmani', { expires: 7, domain: '.digilogbook.app' });                                                

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

    const checkUserAuthentication = () => {
      const isAuthenticated = Cookies.get('isUserAuthenticated') || 'false';
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
        {location.pathname !== '/login' && location.pathname !== '/signUp' &&
        <Navbar />
        }
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
            token && isUserAuthenticated === 'noCertificate' && 
            (
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
            token 
            &&
            (isUserAuthenticated === 'noEmail' || isUserAuthenticated === 'noCertificate' || isUserAuthenticated === 'noAdminApprovment') 
            && 
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
                  <Route index element={<EquipmentsList />} />
                  <Route path="flightEquipment" element={<EquipmentsList />} />
                  <Route path="parachute" element={<EquipmentsList />} />
                  <Route path="harness" element={<EquipmentsList />} />
              </Route>
              <Route path='/equipment/addFlightEquipment' element={<AddEquipment />} /> 
              <Route path='/equipment/addParachute' element={<AddEquipment />} />
              <Route path='/equipment/addHarness' element={<AddEquipment />} />
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
              {/* club equipments */}
              <Route path="/club/clubEquipment" element={ < ClubEquipment />} >
                  <Route index element={<EquipmentsList />} />
                  <Route path="flightEquipments" element={<EquipmentsList />} />
                  <Route path="parachutes" element={<EquipmentsList />} />
                  <Route path="harnesses" element={<EquipmentsList />} />
              </Route >
              <Route path='/club/addFlightEquipmentForClub' element={<AddEquipment />} /> 
              <Route path='/club/addParachuteForClub' element={<AddEquipment />} />
              <Route path='/club/addHarnessForClub' element={<AddEquipment />} />
              <Route path='/EditClubEquipment/:id' element={<EditEquipment />} />
              <Route path='/possessionTransitionEquipmentClub/:id' element={<PossessionTransitionEquipment />} />
              {/* club coaches */}
              <Route path="/club/clubCoaches" element={ < ClubCoaches  />} />
              <Route path="/club/coachDetails/:id" element={ < ClubCoachDetails />} />
              {/* club education */}
              <Route path="/club/clubCourses" element={ < Education  />} />
              <Route path="/club/addCourseToClub" element={ < AddCourse  />} />
              <Route path='/club/courseDetails/:id' element={<CourseDetails />} >
                <Route index element={<CourseStudents />} />
                <Route path="students" element={<CourseStudents />} />
                <Route path="classes" element={<CourseClasses />} />
                <Route path="syllabi" element={<ClubCourseSyllabi />} />
              </Route> 
              {/* student details */}
              <Route path='/club/courseDetails/studentDetails/:studentId' element={<ClubCourseStudentDetails />} >
                <Route index element={<ClubCourseStudentPracticalDetails />} />
                <Route path="practical" element={<ClubCourseStudentPracticalDetails />} />
                <Route path="theory" element={<ClubCourseStudentTheoryDetails />} />
                <Route path="syllabi" element={<ClubCourseStudentSyllabiDetails />} />
              </Route>
              <Route path='/club/courseDetails/studentDetails/aStudentFlight/:flightId' element={<ClubCourseStudentAFlightDetails />} />
              {/* id 1 is for active students and id 2 is for history student */}
              <Route path='/club/clubCourses/studentsListClub/:id' element={<StudentsList />} />
              <Route path='/club/clubCourses/studentsListClub/aStudentClubCourses/:studentId' element={<AStudentCourses />} />


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
              <Route path='/Settings/AddNewCertificate' element={<AddNewCertificate />} />
              <Route path='/Settings/RenewCertificate/:id' element={<RenewCertificate />} />

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