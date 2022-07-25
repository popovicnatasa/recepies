import '../App.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import IngredientCard from './IngredientCard';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';



function Ingredients() {

  const [ingredientsData, setIngData] = useState([]);

  useEffect(() => {
    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'https://jsonblob.com/api/1000877400397201408',
      headers: {}
    };

    axios(config)
      .then(function (response) {
        const transformedData = response.data.map((ingredient) => {
          let short = ingredient.description.substring(0, 150);
          return { id: ingredient.id, name: ingredient.name, image: ingredient.image, description: short }
        });
        setIngData(transformedData);
        console.log(ingredientsData);
      })

      .catch(function (error) {
        console.log(error);
      });

  },[ingredientsData]);

  useEffect(() => {
    console.log(ingredientsData);
  }, []);

  const displayPosts = () => {
    return ingredientsData.map((ingredient) => {
      return <IngredientCard id={ingredient.id} name={ingredient.name} image={ingredient.image} description={ingredient.description} key={ingredient.id}></IngredientCard>
    })
  }

  return (
    <div style={{ minHeight: "700px" }}>
      <Typography variant="h2" component="div" align="center">
        Ingredients
      </Typography>

      <Grid container spacing={2} columns={3}>
        
          {displayPosts()}
     
      </Grid>
    </div>
  );
}

export default Ingredients;
