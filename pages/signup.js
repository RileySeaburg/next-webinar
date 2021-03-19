import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Template from '../components/Template';
import RegistrationForm from '../components/RegistrationForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Login = () => {
  const classes = useStyles();
  return (
    <Template className={classes.root} title='Login'>
      <Box
        display='flex'
        flexDirection='column'
        height='100%'
        justifyContent='center'
      >
        <Container maxWidth='sm'>
          <RegistrationForm />
        </Container>
      </Box>
    </Template>
  );
};
export default Login;
