import React from 'react';

import { Box, useMediaQuery, useTheme } from '@mui/material';

const FooterLanding = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="footer"
      sx={{
        zIndex:'100',
        bottom:'0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        background: `var(--landing-page-titles-bg)`,
        boxShadow:'var(--landing-page-titles-boxShadow)',
        borderRadius: isSmallScreen ? '0rem' : '0rem 0 0 0rem',
        height: isSmallScreen ? '375px' : '320px',
        width: '100%',
        marginTop: '0',
        marginBottom: '0',
      }}
    >
        <ul>
            <li>home</li>
            <li>home</li>
            <li>home</li>
            <li>home</li>
        </ul>
        <div>test</div>
        <div>test</div>
    </Box>
  );
};

export default FooterLanding;