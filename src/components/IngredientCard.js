import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Grid } from '@mui/material';
import ScrollDialog from './ScrollDialog';

function IngredientCard(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        
            <Grid item >
                <ScrollDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} name={props.name} description={props.long} image={props.image}></ScrollDialog>

                <Card sx={{ width: 345, minHeight:300 }}>
                    <CardActionArea onClick={handleClickOpen}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={props.image}
                            alt={props.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {props.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {props.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        
    );
}

export default IngredientCard;