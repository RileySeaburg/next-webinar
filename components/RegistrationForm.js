import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import cookie from 'js-cookie';
import FacebookIcon from '../public/icons/Facebook';
import GoogleIcon from '../public/icons/Google';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
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
  policy: false,
};

export default function LoginForm() {
  const [error, setError] = useState(null);
  return (
    <div>
      <Container maxWidth='sm'>
        <Formik
          // Required to set Formik State
          initialValues={initialValues}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Email is required'),
            firstName: Yup.string().max(255).required('First name is required'),
            lastName: Yup.string().max(255).required('Last name is required'),
            phone: Yup.string().phone(
              'US',
              true,
              'A valid ${path} is required'
            ),
            password: Yup.string()
              .max(255)
              .required('A valid password is required'),
            policy: Yup.boolean().oneOf([true], 'This field must be checked'),
          })}
          // Get's Called when first submitted.
          // function (data, {destructured objects}) {do something here}
          onSubmit={async ({ email, password, firstName, lastName, phone }) => {
            await fetch('/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                password,
                firstName,
                lastName,
                phone,
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
          {({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            touched,
            errors,
          }) => (
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
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                name='firstName'
                fullWidth
                as={TextField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                label='First Name'
              />
              <Field
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                name='lastName'
                fullWidth
                as={TextField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                label='Last Name'
              />
              <Field
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                name='email'
                as={TextField}
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                label='Email'
              />
              <Field
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
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
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
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
              {Boolean(touched.policy && errors.policy) && (
                <FormHelperText error>{errors.policy}</FormHelperText>
              )}
              <Button type='submit'>Submit</Button>
              <div>{error}</div>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}
