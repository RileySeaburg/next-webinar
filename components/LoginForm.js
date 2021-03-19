import React, { useState } from 'react';
import NextLink from 'next/link';
import Router from 'next/router';
import cookie from 'js-cookie';
import FacebookIcon from '../public/icons/Facebook';
import GoogleIcon from '../public/icons/Google';
import { Form, Formik, Field } from 'formik';
import { object, string } from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';

const initialValues = {
  email: 'riley@rileyseaburg.com',
  password: 'Password123',
};

export default function LoginForm() {
  const [error, setError] = useState(null);
  return (
    <div>
      <Card>
        <CardContent>
          <Formik
            // Required to set Formik State
            initialValues={initialValues}
            validationSchema={object({
              email: string()
                .email('Must be a valid email')
                .min(6)
                .max(255)
                .required('Email is required'),
              password: string()
                .min(6)
                .max(255)
                .required('Password is required'),
            })}
            // Get's Called when first submitted.
            // function (data, {destructured objects}) {do something here}
            onSubmit={async ({ email, password }) => {
              await fetch('/api/auth', {
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
            {({ values, handleSubmit, handleChange, handleBlur }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name='email'
                  as={TextField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  label='Email'
                />
                <br />
                <Field
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  as={TextField}
                  label='Password'
                />
                <br />
                <Button type='submit'>Submit</Button>
                <div>{error}</div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
