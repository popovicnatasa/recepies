import '../App.css';
import * as React from 'react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import { useParams } from 'react-router-dom';
import Recipe from './Recipe';

function Recipes ()
{
    const { name } = useParams();


    const [ searchText, setSearchText ] = useState("");
    const [ searchRadio, setSearchRadio ] = useState("name");
    const [ recipesData, setRecipesData ] = useState([]);
    const [ filteredRecipesData, setFilteredRecipesData ] = useState([]);

    const [openDialog, setOpenDialog] = React.useState(false);
    const [scrollDialog, setScrollDialog] = React.useState('paper');
    const [recipeID, setRecipeID] = useState(0);

    const handleClickOpenDialog = (scrollType, recipeID) => () => {
        setOpenDialog(true);
        setScrollDialog(scrollType);
        setRecipeID(recipeID);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setRecipeID(0);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (openDialog) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
            descriptionElement.focus();
        }
        }
    }, [openDialog]);

    const [currentPage, setCurrentPage] = useState(0);
    
    let PageSize = 10;

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setFilteredRecipesData(recipesData.slice(firstPageIndex, lastPageIndex));
    }, [currentPage]);


    const getMeals = useCallback(()=>{
        var axios = require('axios');
        setCurrentPage(0);
        var config = {
          method: 'get',
          url: 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + ((searchRadio === "name") ? searchText : ""),
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
    
              return { id: meal.idMeal, name: meal.strMeal, image: mealThumb, description: short, area: meal.strArea, mainIngredient: meal.strIngredient1, category: meal.strCategory }
            });

            const filteredByCategory = transformedData.filter(meal=>meal.category.toLowerCase() === name.toLowerCase());
            if(searchRadio === "name" || searchText === "")
                setRecipesData(filteredByCategory)
            else {
                if (searchRadio === "area")
                {
                    setRecipesData(filteredByCategory.filter(meal=>meal.area.toLowerCase() === searchText.toLowerCase()))
                }
                else if (searchRadio === "ingredient")
                {
                    setRecipesData(filteredByCategory.filter(meal=>meal.mainIngredient.toLowerCase() === searchText.toLowerCase()));
                }
            }
            setCurrentPage(1);
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
            <Pagination
                currentPage={currentPage}
                totalCount={Math.ceil(recipesData.length / PageSize)}
                onPageChange={page => setCurrentPage(page)}
            />
            <br/>
            <Grid container spacing={7} columns={3}>
            {
                filteredRecipesData.map((recipe)=>{
                    return <RecipeCard id={recipe.id} name={recipe.name} image={recipe.image} description={recipe.description} key={recipe.id} onClick={handleClickOpenDialog('paper', recipe.id)}></RecipeCard>

                })
            }
            </Grid>
            <Recipe open={openDialog} scroll={scrollDialog} handleClickOpenDialog={handleClickOpenDialog} recipeID={recipeID} handleClose={handleCloseDialog} descriptionElementRef={descriptionElementRef} ></Recipe>
            <br/><br/>
        </div>
    )

}

export default Recipes;