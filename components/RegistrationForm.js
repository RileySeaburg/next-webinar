import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import cookie from 'js-cookie';
import FacebookIcon from '../public/icons/Facebook';
import GoogleIcon from '../public/icons/Google';
import { Form, Formik, Field } from 'formik';
import { object, string } from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Link as UILink,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';

const initialValues = {
  firstName: 'This',
  lastName: 'Guy',
  email: 'riley@rileyseaburg.com',
  phone: '1-800-876-5309',
  password: 'Password123',
};

export default function LoginForm() {
  const [error, setError] = useState(null);
  return (
    <div>
      <Container maxWidth='sm'>
        <Formik
          // Required to set Formik State
          initialValues={initialValues}
          validationSchema={object({
            password: string().min(6).max(255).required('Password is required'),
          })}
          // Get's Called when first submitted.
          // function (data, {destructured objects}) {do something here}
          onSubmit={async ({ email, password }) => {
            await fetch('/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                password,
              }),
            })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                if (data && data.error == true) {
                  throw new Error(data.message);
                }
                if (data && data.token) {
                  // set cookie
                  cookie.set('token', data.token, { expires: 2 });
                  Router.push('/');
                }
              })
              .catch((error) => {
                setError(error.message);
                console.log(error);
                setTimeout(() => {
                  setError(null);
                }, 3000);
              });
          }}
        >
          {({ values, handleSubmit, handleChange, handleBlur, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Box mb={3}>
                <Typography color='textPrimary' variant='h2'>
                  Create a new account
                </Typography>
                <Typography color='textSecondary' gutterBottom variant='body2'>
                  Use your email to create new account
                </Typography>
              </Box>
              <Field
                name='firstName'
                fullWidth
                as={TextField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                label='First Name'
              />
              <Field
                name='lastName'
                fullWidth
                as={TextField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                label='Last Name'
              />
              <Field
                name='email'
                as={TextField}
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                label='Email'
              />
              <Field
                name='phone'
                fullWidth
                as={TextField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                label='Phone Number'
              />
              <br />
              <Field
                name='password'
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                as={TextField}
                label='Password'
              />
              <br />
              <Box alignItems='center' display='flex' ml={-1}>
                <Checkbox
                  checked={values.policy}
                  name='policy'
                  onChange={handleChange}
                />
                <Typography color='textSecondary' variant='body1'>
                  I have read the{' '}
                  <Link href='/terms'>
                    <UILink color='primary' underline='always' variant='h6'>
                      Terms and Conditions
                    </UILink>
                  </Link>
                </Typography>
              </Box>
              <Button type='submit'>Submit</Button>
              <div>{error}</div>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}
