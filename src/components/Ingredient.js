import '../App.css';
import * as React from 'react';
import Typography from '@mui/material/Typography';

function Ingredient(props) {

  return (
    <div style={{ minHeight: "700px" }}>
      <Typography variant="h2" component="div" align="center">
        Ingredient name
      </Typography>
    </div>
  );
}

export default Ingredient;
