import React from 'react';
import { Box, Container } from '@material-ui/core';
import Template from '../components/Template';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <Template title='Login'>
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
