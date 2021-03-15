import React, { Component } from 'react'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = { login: "" }
        this.state = { password: "" }
        this.handleLoginChange = this.handleLoginChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleLoginChange(evt) {
        this.setState({ login: evt.target.value })
    }
    handlePasswordChange(evt) {
        this.setState({ password: evt.target.value })
    }
    handleSubmit(evt) {
        alert(`You typed: ${this.state.login}`)
        this.setState({ login: "" })
    }
    render() {
        return (
            <div>
                <Box component="span" m={1}>
                    <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                        <TextField id="login" label="Login" value={this.state.login} onChange={this.handleLoginChange} />
                        <br />
                        <TextField id="password" label="Password" value={this.state.password} onChange={this.handlePasswordChange} />

                        <br></br> <button >
                            Submit
    </button>
                    </form>
                </Box>
            </div>
        )
    }
}
export default Login