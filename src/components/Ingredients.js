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
      url: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
      headers: { }
    };

    axios(config)
      .then(function (response) {
        //console.log(response.data.meals);
        const slicedArray = response.data.meals.slice(0, 20);
        const transformedData = slicedArray.map((ingredient) => {
          //console.log(response.data);
          let short = ingredient.strDescription;
          if (short != null)
          {
            short = ingredient.strDescription.substring(0, 150);
          }
          let imgUrl = "https://www.themealdb.com/images/ingredients/"+ingredient.strIngredient+".png";
          imgUrl = imgUrl.replace(" ", "%20");

          console.log(imgUrl);
          return { id: ingredient.idIngredient, name: ingredient.strIngredient, image: imgUrl, description: short }
        });
        setIngData(transformedData);
        console.log(ingredientsData);
      })

      .catch(function (error) {
        console.log(error);
      });

  },[]);

  useEffect(() => {
    //console.log(ingredientsData);
  }, [ingredientsData]);

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
