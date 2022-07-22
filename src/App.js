import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  ThemeProvider, createTheme } from '@mui/material/styles';
import { Grid, Avatar, FormControlLabel, Checkbox } from '@mui/material';
import { Link } from '@mui/material';

import Registration from './components/Registration';
import Login from './components/Login';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom';

const theme = createTheme();

function handleSubmit(e) {
  console.log('submit');
}

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<HomePage></HomePage>}></Route>
        <Route exact path="/aboutus" element={<HomePage></HomePage>}></Route>
        <Route exact path="/recipes" element={<HomePage></HomePage>}></Route>
        <Route exact path="/ingredients" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
