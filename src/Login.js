import { Button, Grid, Link, TextField, Typography, Container } from '@mui/material';
import React from 'react'
import { signin } from './ApiService';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get("email");
        const password = data.get("password");
        signin({email: email, password: password}).then((response) => 
        response.json().then((json) => {
            console.log("response data: " + json.email);
        }))
    }

    render() {
        return (
            <Container component="main" maxWidth="xs" style={{marginTop: "8%"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            로그인
                        </Typography>
                    </Grid>
                </Grid>
                <form noValidate onSubmit={this.handleSubmit}>
                    {" "}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            variant='outlined'
                            required
                            fullWidth
                            id="email"
                            label="이메일 주소"
                            name="email"
                            autoComplete='email'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            variant='outlined'
                            required
                            fullWidth
                            name="password"
                            label="패스워드"
                            type="password"
                            id="password"
                            autoComplete='current-password'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                            type="submit"
                            fullWidth
                            variant='contained'
                            color="primary">
                                로그인
                            </Button>
                        </Grid>
                        <Grid container justifyContent='flex-end'>
                            <Link href="/signup" variant='body2'>
                                <Grid item>계정이 없습니까? 여기서 가입 하세요.</Grid>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        )
    }
}