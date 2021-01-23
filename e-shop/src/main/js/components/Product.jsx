import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { PRIMARY_1, PRIMARY_2 } from '../constants/Colors';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import { ADMIN } from '../constants/Roles';

const useStyles = makeStyles({
    grid: {
        marginTop: '2em',
        marginBottom: '2em'
    },
    card: {
        maxWidth: 345,
        minWidth: 345,
        borderRadius: 0,
        boxShadow: 'none',
        border: `3px solid ${PRIMARY_2}`,
    },
    media: {
        height: 140,
    },
    title: {
        color: PRIMARY_1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    button: {
        color: PRIMARY_2,
        boxShadow: 'none',
        border: `1px solid ${PRIMARY_2}`
    },
    description: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
});

export default function Product(props) {
    const classes = useStyles();
    const { data, setProduct, setDialogOpen, user, getProducts, basket, getBasketItems } = props;

    const handleCardClick = () => {
        setProduct(data);
        setDialogOpen(true);
    };

    const handleDeleteButton = () => {
        fetch(`/admin/api/product?id=${data.id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                getProducts(true);
                getBasketItems();
            }
        })
    };

    const handleAddToBasket = () => {
       fetch(`/auth/api/basket/product?productId=${data.id}&userId=${user.id}`, {
           method: 'POST',
       }).then(response => {
            if (response.ok) {
                getBasketItems();
            }
       });
    };

    const contains = () => {
        let con = false;
        basket && basket.forEach(p => {
            if (p.id === data.id) {
                con = true;
            }
        });
        return con;
    };

    return (
        <Grid item container xs={12} sm={6} md={4} lg={4} xl={3} justify='center' className={classes.grid}>
            <Card className={classes.card}>
                <CardActionArea onClick={handleCardClick}>
                    <CardMedia
                        className={classes.media}
                        image={data.imageUrl ? data.imageUrl : 'img/noimg.png'}
                        title='Product image.'
                    />
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='h2' className={classes.title}>
                            {data.name}
                        </Typography>
                        <Typography variant='body2' color='textSecondary' component='p'>
                            {data.price}$
                        </Typography>
                        <Divider />
                        <Typography variant='body2' color='textSecondary' component='p' className={classes.description}>
                            {data.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Fab
                        size='small'
                        className={classes.button}
                        onClick={handleAddToBasket}
                        disabled={!Boolean(user) || contains()}
                    >
                        <AddIcon />
                    </Fab>
                    {
                        (user && user.role === ADMIN) && (
                            <Fab size='small' className={classes.button} onClick={handleDeleteButton}>
                                <DeleteIcon />
                            </Fab>
                        )
                    }
                </CardActions>
            </Card>
        </Grid>
    );
}