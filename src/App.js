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

const theme = createTheme();

function handleSubmit(e) {
  console.log('submit');
}

function App() {
  return (
    <div>
    Home Page
    
    </div>
  );
}

export default App;
