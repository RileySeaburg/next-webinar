import React, { useState } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const Signup = () => {
    const [signupError, setSignupError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((r) => r.json())
            .then((data) => {
                if (data && data.error) {
                    setSignupError(data.message);
                }
                if (data && data.token) {
                    //set cookie
                    cookie.set('token', data.token, { expires: 2 });
                    Router.push('/');
                }
            });
    }
    return (
        <Box component="span" m={1}>
            <form onSubmit={handleSubmit}>
                <p>Sign Up</p>
                <label htmlFor="email">
                    email
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="email"
                    />
                </label>

                <br />

                <label htmlFor="password">
                    password
                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        type="password"
                    />
                </label>

                <br />

                <Button value="Submit" type="submit">Sign Up!</Button>
                {signupError && <p style={{ color: 'red' }}>{signupError}</p>}
            </form>
        </Box>
    );
};

export default Signup;