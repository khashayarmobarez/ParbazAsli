import React from 'react';

// mui
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CircularProgressLoader = () => {
    return (
        <Box sx={{ display: 'flex', width:'full' , justifyContent:'center', marginTop:'4rem' }}>
            <CircularProgress /> 
        </Box>
    );
};

export default CircularProgressLoader;