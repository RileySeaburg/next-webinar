import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Template from '../components/Template';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <Template className='classes.root' title='Login'>
      <Box
        display='flex'
        flexDirection='column'
        height='100%'
        justifyContent='center'
      >
        <Container maxWidth='sm'>
          <LoginForm />
        </Container>
      </Box>
    </Template>
  );
};
export default Login;
