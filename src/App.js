import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// components
import Footer from './components/Footer/Footer';
import Navbar from './components/Header/Navbar';
import Profile from './containers/Profile';


const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <div className="App">
        <Navbar/>
          <Routes>
            <Route path='/profile' element={<Profile/>} />
            <Route path='/*' element={<Profile/>} />
          </Routes>
        <Footer />
      </div>

    </QueryClientProvider>



  );
}

export default App;