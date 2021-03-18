import React, { useState } from 'react';
import NextLink from 'next/link';
import Router from 'next/router';
import cookie from 'js-cookie';
import FacebookIcon from '../public/icons/Facebook';
import GoogleIcon from '../public/icons/Google';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';

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
      <Card>
        <CardContent>
          <Formik initialValues={initialValues} onSubmit={() => {}}>
            {({ values }) => (
              <Form>
                <Field name='email' as={TextField} label='Email' />
                <br />
                <Field name='password' as={TextField} label='Password' />
                <pre>{JSON.stringify(values, null, 4)}</pre>
                <Button type='Submit'>Submit</Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
