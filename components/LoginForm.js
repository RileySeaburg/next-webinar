import React, { useState } from 'react';
import NextLink from 'next/link';
import Router from 'next/router';
import cookie from 'js-cookie';
import FacebookIcon from '../public/icons/Facebook';
import GoogleIcon from '../public/icons/Google';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export default function LoginForm() {
  function handleSubmit(e) {
    e.preventDefault();
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        if (data && data.error) {
          setLoginError(data.message);
        }
        if (data && data.token) {
          // set cookie
          cookie.set('token', data.token, { expires: 2 });
          Router.push('/');
        }
      });
  }
  return (
    <div>
      <Formik
        initialValues={{
          email: 'riley@rileyseaburg.com',
          password: 'Password123',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box mb={3} align='center'>
              <Typography color='textPrimary' variant='h2'>
                Sign in
              </Typography>
              <Typography color='textSecondary' gutterBottom variant='h3'>
                In order to use the webinar platform you must sign in.
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  color='primary'
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={handleSubmit}
                  size='large'
                  variant='contained'
                >
                  Login with Facebook
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  startIcon={<GoogleIcon />}
                  onClick={handleSubmit}
                  size='large'
                  variant='contained'
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
            <Box mt={3} mb={1}>
              <Typography align='center' color='textSecondary' variant='body1'>
                or login with email address
              </Typography>
            </Box>
            <TextField
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              label='Email Address'
              margin='normal'
              name='email'
              onBlur={handleBlur}
              onChange={handleChange}
              type='email'
              value={values.email}
              variant='outlined'
            />
            <TextField
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              label='Password'
              margin='normal'
              name='password'
              onBlur={handleBlur}
              onChange={handleChange}
              type='password'
              value={values.password}
              variant='outlined'
            />
            <Box my={2}>
              <Button
                color='primary'
                disabled={isSubmitting}
                fullWidth
                size='large'
                type='submit'
                variant='contained'
              >
                Sign in now
              </Button>
            </Box>
            <Typography color='textSecondary' variant='body1'>
              Don&apos;t have an account?{' '}
              <NextLink href='/signup'>
                <Link style={{ cursor: 'pointer' }} variant='h6'>
                  Sign up
                </Link>
              </NextLink>
            </Typography>
          </form>
        )}
      </Formik>
    </div>
  );
}
