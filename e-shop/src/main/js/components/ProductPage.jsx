import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import CustomTextField from '../auth/components/CustomTextField';
import { PRIMARY_1, PRIMARY_2 } from '../constants/Colors';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import CardActions from '@material-ui/core/CardActions';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { ADMIN } from '../constants/Roles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        minHeight: 400,
        borderRadius: 0
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    content: {
        width: '100%'
    },
    cover: {
        width: 550,
    },
    reviewContainer: {
        width: '70%'
    },
    allReviews: {
        width: '70%',
        marginBottom: '2em',
    },
    productTitle: {
        color: PRIMARY_1
    },
    container: {
        marginTop: '1.5em'
    },
    reviewLabel: {
        color: PRIMARY_1,
    },
    cardContent: {
        marginTop: '1.2em'
    },
    addButton: {
        color: PRIMARY_1,
        margin: 'auto',
        width: '7em',
        height: '3em'
    },
    actions: {
        marginTop: 'auto',
        padding: theme.spacing(2)
    },
    cardButton: {
        color: PRIMARY_2,
        boxShadow: 'none',
        border: `1px solid ${PRIMARY_2}`
    },
    warning: {
        color: PRIMARY_2
    },
}));

export default function ProductPage(props) {
    const classes = useStyles();
    const { data, user, getProducts, setDialogOpen, basket, getBasketItems } = props;
    const [reviewContent, setReviewContent] = useState('');
    const [reviews, setReviews] = useState('');
    const [reload] = useState(false);

    useEffect(() => {
        getReviews();
    }, [reload]);

    const handleReviewInput = (e) => {
        const content = e.target.value;
        setReviewContent(content);
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

    const handleAddButton = () => {
        fetch('/auth/api/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: data.id,
                content: reviewContent,
                avatarUrl: user.avatarUrl,
                userNickname: user.nickname,
            }),
        }).then(response => {
            if (response.ok) {
                setReviewContent('');
                getReviews();
            }
        });
    };

    const getReviews = () => {
        fetch(`/public/api/reviews?productId=${data.id}`, {
            method: 'GET',
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(data => {
            setReviews(data);
        })
    };

    const handleDeleteButton = () => {
        fetch(`/admin/api/product?id=${data.id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                getProducts(true);
                setDialogOpen(false);
                getBasketItems();
            }
        })
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
        <Grid container direction='column'>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cover}
                    image={data.imageUrl ? data.imageUrl : 'img/noimg.png'}
                    title='Product image.'
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component='h3' variant='h3' className={classes.productTitle}>
                            {data.name}
                        </Typography>
                        <Typography variant='subtitle1' color='textSecondary'>
                            {data.price}$
                        </Typography>
                        <Typography variant='subtitle1' color='textSecondary'>
                            Category: {data.category.name}
                        </Typography>
                        <Divider />
                        <Typography variant='body1' className={classes.cardContent}>
                            {data.description}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Fab
                            size='small'
                            className={classes.cardButton}
                            onClick={handleAddToBasket}
                            disabled={!Boolean(user) || contains()}
                        >
                            <AddIcon />
                        </Fab>
                        {
                            (user && user.role === ADMIN) && (
                                <Fab size='small' className={classes.cardButton} onClick={handleDeleteButton}>
                                    <DeleteIcon />
                                </Fab>
                            )
                        }
                    </CardActions>
                </div>
            </Card>
            <Grid item container alignContent='center' justify='center' className={classes.container}>
                {
                    user ? (
                        <Grid
                            item
                            container
                            alignContent='center'
                            justify='center'
                            className={classes.reviewContainer}
                        >
                            <Typography variant='subtitle1' className={classes.reviewLabel}>
                                Type your thoughs about this product
                                </Typography>
                            <Grid item container xs={10}>
                                <CustomTextField
                                    variant='outlined'
                                    margin='normal'
                                    fullWidth
                                    id='new_review'
                                    label='New Review'
                                    multiline
                                    value={reviewContent}
                                    onChange={handleReviewInput}
                                />
                            </Grid>
                            <Grid item container xs={2}>
                                <Button className={classes.addButton} onClick={handleAddButton}>
                                    <Typography variant='button'>
                                        Add
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    )
                        :
                        (
                            <Grid
                                item
                                container
                                alignContent='center'
                                justify='center'
                                className={classes.reviewContainer}
                            >
                                <Typography className={classes.warning}>
                                    Please <Link href='/login'>sign in</Link> to add reviews!
                                </Typography>
                            </Grid>
                        )
                }
                <Grid
                    item
                    container
                    alignContent='flex-start'
                    justify='flex-start'
                    className={classes.allReviews}
                >
                    <List>
                        {
                            reviews && reviews.map((review, index) =>
                                <ListItem alignItems='flex-start' key={`reviews_${index}`}>
                                    <ListItemAvatar>
                                        <Avatar alt='noimg' src={review.avatarUrl ? review.avatarUrl : 'img/avatar.jpg'} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={review.userNickname ? review.userNickname : 'Anonymous'}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component='span'
                                                    variant='body2'
                                                >
                                                    {review.content}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                )
                        }
                    </List>
                </Grid>
            </Grid>
        </Grid>
    );
}
