import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Product from './Product';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY_2, PRIMARY_1 } from '../constants/Colors';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ProductPage from './ProductPage';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: '3em',
    },
    pageTitle: {
        color: PRIMARY_2,
    },
    loadMoreButton: {
        color: PRIMARY_1,
        marginBottom: theme.spacing(4)
    },
    appBar: {
        position: 'relative',
        backgroundColor: PRIMARY_1,
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});



export default function ProductsContainer(props) {
    const classes = useStyles();

    const { category, basket, getBasketItems } = props;
    
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState(null);

    const size = 9;

    const handleClose = () => {
        setProduct(null);
        setOpen(false);
    };

    useEffect(() => {
        getProducts(false);
    }, [page]);

    useEffect(() => {
        getProducts(true);
    }, [category]);

    const getProducts = erase => {
        const url = `/public/api/products/asc?page=${page}&size=${size}`;
        const id = category ? category.id : -1;
        const urlCat = `/public/api/category/products?page=${page}&size=${size}&categoryId=${id}`;

        fetch(category ? urlCat : url, {
            method: 'GET'
        }).then(response => {
            if (response.status && response.status === 200) {
                return response.json();
            }
        }).then(data => {
            setProducts(erase ? data : [...products, ...data]);
            if (erase) {
                setPage(0);
            }
        });
    };

    const handleLoadMore = () => {
        if ((page + 1) * size === products.length) {
            setPage(page + 1);
        }
    };

    return (
        <Grid container className={classes.container}>
            <Grid item container justify='center'>
                <Typography variant='h6' className={classes.pageTitle}>
                    {category ? category.name : 'Latest products'}
                </Typography>
            </Grid>
            {
                products.map(p => <Product 
                                        key={p.id}
                                        data={p}
                                        setProduct={setProduct}
                                        setDialogOpen={setOpen}
                                        user={props.user}
                                        getProducts={getProducts}
                                        basket={basket}
                                        getBasketItems={getBasketItems}
                                    />)
            }
            {
                products.length && (
                    <Grid container item justify='center'>
                        <Button className={classes.loadMoreButton} color='inherit' onClick={handleLoadMore}>Load more</Button>
                    </Grid>
                )
            }
            <div>
                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
                                <CloseIcon />
                            </IconButton>
                            <Typography variant='h6' className={classes.title}>
                                {
                                    product && product.name
                                }
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {
                        product && <ProductPage 
                                        data={product}
                                        user={props.user}
                                        getProducts={getProducts}
                                        setDialogOpen={setOpen}
                                        basket={basket}
                                        getBasketItems={getBasketItems}
                                    />
                    }
                </Dialog>
            </div>
        </Grid>
    );
}