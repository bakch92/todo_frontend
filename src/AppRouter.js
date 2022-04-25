import { Box, Typography } from '@mui/material';
import React, { Component } from 'react';
import Login from './Login';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from './SignUp';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright c "}
            fsoftwareengineer, 2022{new Date().getFullYear}
            {"."}
        </Typography>
    );
}

export default class AppRouter extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Routes>
                            <Route path="/" element={<App />}></Route>
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="/signup" element={<SignUp />}></Route>
                        </Routes>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Router>
            </div>
        )
    }
}
