import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

function Recipe(props) {

    const [ name, setName ] = useState("");
    const [ instructions, setInstructions ] = useState("");
    const [ image, setImage ] = useState("");
    const [ mainIngredient, setMainIngredient ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ area, setArea ] = useState("");
    const [ youtube, setYoutube ] = useState("");

    useEffect(() => {
        var axios = require('axios');
        
        var config = {
          method: 'get',
          url: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + props.recipeID,
          headers: { }
        };
        

        if (props.recipeID > 0)
        {
            axios(config)
            .then(function (response) {
                const slicedArray = response.data.meals;
                slicedArray.map((meal) => {
                setName(meal.strMeal);
                setInstructions(meal.strInstructions);
                setImage(meal.strMealThumb);
                setMainIngredient(meal.strIngredient1);
                setCategory(meal.strCategory);
                setArea(meal.strArea);
                });

            })
        
            .catch(function (error) {
                console.log(error);
            });
        }
    })
    
    return (
        <Dialog
        open={props.open}
        onClose={props.handleClose}
        scroll={props.scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{name}</DialogTitle>
        <DialogContent dividers={props.scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={props.descriptionElementRef}
            tabIndex={-1}
          >
            <img id="recipeImage" src={image} alt="Meal"/>
            <br/>
            <b><Typography gutterBottom variant="h6" color="#8D3D5B" component="span">Instructions</Typography></b>
            <br/>
            {instructions}
            <br/>
            <b><Typography gutterBottom variant="h6" color="#8D3D5B" component="span">Main Ingredient</Typography></b>
            <br/>
            {mainIngredient}
            <br/>
            <b><Typography gutterBottom variant="h6" color="#8D3D5B" component="span">Category</Typography></b>
            <br/>
            {category}
            <br/>
            <b><Typography gutterBottom variant="h6" color="#8D3D5B" component="span">Area</Typography></b>
            <br/>
            {area}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
}

export default Recipe;