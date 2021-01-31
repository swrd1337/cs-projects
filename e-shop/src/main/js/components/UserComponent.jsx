import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ADMIN } from '../constants/Roles';
import { PRIMARY_1 } from '../constants/Colors';
import CustomTextField from '../auth/components/CustomTextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ImageUploader from 'react-images-upload';
import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import Payment from './Payment';
import {Elements, StripeProvider} from 'react-stripe-elements';

const useStyles = makeStyles(theme => ({
    userIconsContainer: {
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    avatar: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    title: {
        color: PRIMARY_1,
    },
    button: {
        color: PRIMARY_1,
    }
}));

export default function UserComponent(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [categoryDialog, setCategoryDialog] = useState(false);
    const [removeDialog, setRemoveDialog] = useState(false);
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(0);
    const [categoryName, setCategoryName] = useState('');
    const [categoryToRemove, setCategoryToRemove] = useState(0);
    const [error, setError] = useState(false);
    const [reload] = useState(false);
    const [basketAnchor, setBasketAnchor] = useState(null);
    const [paymentDialog, setPaymentDialog] = useState(false);
    
    const { user, basket, getBasketItems } = props;

    useEffect(() => {
        getCategories();
        getBasketItems();
    }, [reload])

    const getCategories = () => {
        fetch('/public/api/categories', {
            method: 'GET'
        }).then(response => {
            if (response.status && response.status === 200) {
                return response.json();
            }
        }).then(data => {
            setCategories(data);
        });
    }

    const handleBasketButton = event => setBasketAnchor(event.currentTarget);
    const handleBasketClose = () => setBasketAnchor(null);

    const handleClick = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleAddProduct = () => {
        setAnchorEl(null);
        setProductDialog(true);
    }

    const handleAddCategory = () => {
        setAnchorEl(null);
        setCategoryDialog(true);
    }
    const handleRemoveCategory = () => {
        setRemoveDialog(true)
    }

    const handleProductDialogClose = () => setProductDialog(false);
    const handleCategoryDialogClose = () => setCategoryDialog(false);
    const handleRemoveDialogClose = () => setRemoveDialog(false);


    const handeLogout = () => {
        fetch('/logout', {
            method: 'GET'
        }).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        })
    }

    const handleImage = imgs => setImage(imgs[0]);
    const handleName = event => setName(event.target.value);
    const handlePrice = event => setPrice(event.target.value);
    const handleDescription = event => setDescription(event.target.value);
    const handleCategorySelection = event => setCategory(event.target.value);
    const handleCategoryName = event => setCategoryName(event.target.value);
    const handleCategoryToRemove = event => setCategoryToRemove(event.target.value);

    const handleAddButton = () => {
        if (!image || !name || !price || !description || !category) {
            setError(true);
            return;
        }
        const data = new FormData();
        data.append('image', image);
        data.append('productInfo', JSON.stringify({
            name: name,
            price: price,
            description: description,
            categoryId: category,
        }))

        fetch('/admin/api/product', {
            method: 'POST',
            body: data,
        }).then(response => {
            if (response.ok) {
                setProductDialog(false);
                setError(false);
                window.location.reload();
            }
        })
    };

    const handleCategoryAddButton = () => {
        fetch('/admin/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: categoryName,
            })
        }).then(response => {
            if (response.ok) {
                setCategoryDialog(false);
                setCategoryName('');
                getCategories();
            }
        });
    }

    const handleCategoryRemoveButton = () => {
        fetch(`/admin/api/category?id=${categoryToRemove}`, {
            method: 'DELETE',
        }).then(response => {
            if (response.ok) {
                setRemoveDialog(false);
                setCategoryToRemove(0);
                getCategories();
            } else {
                setError(true);
            }
        })
    }

    const handleRemoveFromBasket = prod => {
        fetch(`/auth/api/basket/product?productId=${prod.id}&userId=${user.id}`, {
            method: 'DELETE',
        }).then(response => {
            if (response.ok) {
                getBasketItems();
            }
        })
    }

    // TODO: Fix basket reload. Buy All when no items etc..
    return (
        <Grid container justify='flex-end' alignItems='center'>
            <Grid item className={classes.userIconsContainer}>
                <IconButton color='inherit' onClick={handleBasketButton}>
                    <Badge badgeContent={basket && basket.length} invisible={basket && !basket.length}>
                        <ShoppingBasketIcon />
                    </Badge>
                </IconButton>
                <Menu
                    id='basket-menu'
                    anchorEl={basketAnchor}
                    keepMounted
                    open={Boolean(basketAnchor)}
                    onClose={handleBasketClose}
                >
                    {
                        basket && basket.length ? basket.map((prod, index) =>
                            <div key={`bask${index}${prod.id}`}>
                                <MenuItem button={false}>
                                    <Grid container spacing={1} justify='space-between' alignItems='center' wrap='nowrap'>
                                        <Grid item>
                                            <Avatar
                                                className={classes.avatar}
                                                alt='No Avatar'
                                                src={prod.imageUrl ? prod.imageUrl : 'img/noimg.jpg'}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='h5' color='textSecondary'>{prod.name}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography color='textSecondary'>{prod.price}$</Typography>
                                        </Grid>
                                        <Grid item>
                                            <IconButton 
                                                color='inherit' 
                                                className={classes.button}
                                                onClick={() => { handleRemoveFromBasket(prod); }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </MenuItem>
                            </div>
                        )
                            : (
                                <MenuItem button={false}>No items</MenuItem>
                            )
                    }
                    {
                        (basket && basket.length) ? (
                            <MenuItem onClick={() => setPaymentDialog(true)}>
                                    <Grid container justify='center' alignContent='center' alignItems='center'>
                                        <Typography className={classes.title}>
                                            Buy All
                                    </Typography>
                                    </Grid>
                            </MenuItem>
                        ) : undefined
                    }
                    <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                        <Elements>
                            <Payment open={paymentDialog} setOpen={setPaymentDialog} user={user}/>
                        </Elements>
                    </StripeProvider>
                </Menu>
            </Grid>
            <Button aria-controls='simple-menu' aria-haspopup='true' color='inherit' onClick={handleClick}>
                <Typography color='inherit'>{user.nickname}</Typography>
            </Button>
            <Avatar className={classes.avatar} alt='No Avatar' src={user.avatarUrl ? user.avatarUrl : 'img/avatar.jpg'} />
            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    user.role === ADMIN && (
                        <div>
                            <MenuItem onClick={handleAddProduct}>Add product</MenuItem>
                            <MenuItem onClick={handleAddCategory}>Add category</MenuItem>
                            <MenuItem onClick={handleRemoveCategory}>Remove category</MenuItem>
                        </div>
                    )
                }
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                <MenuItem onClick={handeLogout}>Logout</MenuItem>
            </Menu>
            <Dialog open={productDialog} onClose={handleProductDialogClose} aria-labelledby='product-dialog-title'>
                <DialogTitle id='product-dialog-title' className={classes.title}>Add product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Provide information about your new product.
                    </DialogContentText>
                    {
                        error && <Typography color='error'>Fields can't be empty!😮</Typography>
                    }
                    <ImageUploader
                        buttonText='Choose product image'
                        fileContainerStyle={{
                            boxShadow: 'none',
                            borderRadius: '0'
                        }}
                        buttonStyles={{
                            backgroundColor: PRIMARY_1,
                        }}
                        withPreview={true}
                        withIcon={false}
                        withLabel={false}
                        singleImage={true}
                        onChange={() => { }}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        onChange={handleImage}
                    />
                    <CustomTextField
                        error={error && !name}
                        margin='normal'
                        autoFocus
                        id='name'
                        label='Name'
                        variant='outlined'
                        helperText='Try to use more descriptive name'
                        fullWidth
                        value={name}
                        onChange={handleName}
                    />
                    <CustomTextField
                        error={error && !price}
                        margin='normal'
                        id='name'
                        label='Price'
                        type='number'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText='Enter your price in $ currency'
                        variant='outlined'
                        fullWidth
                        value={price}
                        onChange={handlePrice}
                    />
                    <CustomTextField
                        error={error && !description}
                        margin='normal'
                        id='name'
                        multiline
                        label='Description'
                        variant='outlined'
                        fullWidth
                        value={description}
                        onChange={handleDescription}
                    />
                    <CustomTextField
                        error={error && !category}
                        id='select-category'
                        select
                        label='Select a category'
                        margin='normal'
                        variant='outlined'
                        fullWidth
                        value={category}
                        onChange={handleCategorySelection}
                    >
                        {categories.map(cat => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </CustomTextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleProductDialogClose} className={classes.button}>
                        Cancel
                    </Button>
                    <Button onClick={handleAddButton} className={classes.button}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={categoryDialog} onClose={handleCategoryDialogClose} aria-labelledby='category-dialog-title'>
                <DialogTitle id='category-dialog-title' className={classes.title}>Add category</DialogTitle>
                <DialogContent>
                    <CustomTextField
                        error={categoryName ? false : true}
                        margin='normal'
                        id='name'
                        multiline
                        label='Category name'
                        helperText='Provide new category name'
                        variant='outlined'
                        fullWidth
                        value={categoryName}
                        onChange={handleCategoryName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCategoryDialogClose} className={classes.button}>
                        Cancel
                    </Button>
                    <Button onClick={handleCategoryAddButton} disabled={categoryName ? false : true} className={classes.button}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={removeDialog} onClose={handleRemoveDialogClose} aria-labelledby='remove-dialog-title'>
                <DialogTitle id='remove-dialog-title' className={classes.title}>Remove category</DialogTitle>
                <DialogContent>
                    {
                        error && <Typography color='error'>We can't delete selected category!😮</Typography>
                    }
                    {
                        error && <Typography color='error'>Remove all product with this category!🤔</Typography>
                    }
                    <CustomTextField
                        error={error && !category}
                        id='select-category'
                        select
                        label='Select a category'
                        margin='normal'
                        variant='outlined'
                        fullWidth
                        value={categoryToRemove}
                        onChange={handleCategoryToRemove}
                    >
                        {categories.map(cat => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </CustomTextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRemoveDialogClose} className={classes.button}>
                        Cancel
                    </Button>
                    <Button onClick={handleCategoryRemoveButton} disabled={categoryToRemove ? false : true} className={classes.button}>
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid >
    );
} 