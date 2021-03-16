import React, { useState } from 'react'
import Router from 'next/router';
import cookie from 'js-cookie';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            <Box component="span" m={1}>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField id="email" label="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <TextField id="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <br></br>
                    <Button value="Submit" type="submit">Login</Button>
                    {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                </form>
            </Box>
        </div>
    )
}
export default Login