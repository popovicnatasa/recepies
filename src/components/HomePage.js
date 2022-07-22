import '../App.css';
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

import { Route, Routes } from 'react-router-dom';

const theme = createTheme();

function handleSubmit(e) {
  console.log('submit');
}

function HomePage() {
  return (
    <div style={{minHeight: "700px"}}>
      Home Page
    </div>
  );
}

export default HomePage;
