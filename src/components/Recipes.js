import '../App.css';
import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import IngredientCard from './IngredientCard';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import RecipeCard from './RecipeCard';

function Recipes ()
{
    const [ searchText, setSearchText ] = useState("");
    const [ searchRadio, setSearchRadio ] = useState("name");
    const [ recipesData, setRecipesData ] = useState([]);

    const getMeals = useCallback(()=>{
        var axios = require('axios');
        
        var config = {
          method: 'get',
          url: 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + ((searchRadio == "name") ? searchText : ""),
          headers: { }
        };
    
        axios(config)
          .then(function (response) {
            const slicedArray = response.data.meals;
            const transformedData = slicedArray.map((meal) => {
              let short = meal.strInstructions;
              if (short != null)
              {
                short = meal.strInstructions.substring(0, 150);
              }
              let mealThumb = meal.strMealThumb;
    
              return { id: meal.idMeal, name: meal.strMeal, image: mealThumb, description: short, area: meal.strArea, mainIngredient: meal.strIngredient1 }
            });

            if(searchRadio == "name" || searchText == "")
                setRecipesData(transformedData)
            else {
                if (searchRadio == "area")
                {
                    let newArray = transformedData.filter(meal=>meal.area.toLowerCase() === searchText.toLowerCase());
                    setRecipesData(newArray)
                }
                else if (searchRadio == "ingredient")
                {
                    let newArray = transformedData.filter(meal=>meal.mainIngredient.toLowerCase() === searchText.toLowerCase());
                    setRecipesData(newArray);
                }
                
            }
          })
    
          .catch(function (error) {
            console.log(error);
          });
    

    })
    useEffect(() => {
        getMeals("");
      },[]);


    function onSearch(e)
    {
        e.preventDefault();
        getMeals();
    }

    return (
        <div>
            <br/><br/>
            
            <FormControl fullWidth>
            <TextField id="outlined-basic" onChange={(e)=>setSearchText(e.target.value)} label="Search" variant="outlined" />
            <br/>
            <Button variant="contained" id="searchBtn" onClick={onSearch} endIcon={<SearchIcon />}></Button>
            <RadioGroup 
                id="radio-group"
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                defaultValue="name"
                name="radio-buttons-group"
                onChange={(e)=>setSearchRadio(e.target.value)}
            >
                <FormControlLabel value="name" control={<Radio />} label="Name" />
                <FormControlLabel value="ingredient" control={<Radio />} label="Main Ingredient" />
                <FormControlLabel value="area" control={<Radio />} label="Area" />
            </RadioGroup>
            </FormControl>
            <br/><br/>
            <Grid container spacing={7} columns={3}>
        
                {
                    recipesData.map((recipe)=>{
                        return <RecipeCard id={recipe.id} name={recipe.name} image={recipe.image} description={recipe.description} key={recipe.id}></RecipeCard>
    
                    })
                }
            
            </Grid>
            <br/><br/>
        </div>
    )

}

export default Recipes;