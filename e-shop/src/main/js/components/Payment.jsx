import React, {useEffect, useState} from 'react';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    injectStripe
} from 'react-stripe-elements';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY_2, PRIMARY_1 } from '../constants/Colors';

const useStyles = makeStyles({
    content: {
        minWidth: '25em',
    },
    title: {
        color: PRIMARY_1,
    },
    pay: {
        color: PRIMARY_2,
    },
    cancel: {
        color: 'red',
    }
});

const Payment = (props) => {
    const style = {
        base: {
            fontSize: '24px',
            color: '#424770',
            letterSpacing: '0.025em',
            fontFamily: 'Source Code Pro, monospace',
            '::placeholder': {
                color: '#aab7c4',
            },
            padding: '1em',
        },
        invalid: {
            color: '#9e2146',
        },
    };
    
    const {open, setOpen, user} = props;
    const classes = useStyles();
    const [finalPrice, setFinalPrice] = useState(0);

    useEffect(() => {
        fetch(`/auth/api/basket/price?userId=${user.id}`, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(data => {
            setFinalPrice(data.totalPrice);
        });
    }, [open]);

    const handleBlur = () => {
        console.log('[blur]');
    };

    const handleChange = (change) => {
        console.log('[change]', change);
    };

    const handleFocus = () => {
        console.log('[focus]');
    };

    const handleReady = () => {
        console.log('[ready]');
    };

    const handleCancel = () => setOpen(false);
    const handlePay = () => {/* TODO */};

    return (
        <Dialog open={open}>
            <DialogTitle className={classes.title}>
                <Typography>
                    Final payment: {finalPrice}$
                </Typography>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <form>
                    <Typography>
                        Card number
                    </Typography>
                    <CardNumberElement
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onReady={handleReady}
                        style={style}
                    />
                    <Typography>
                        Expiration date
                    </Typography>
                    <CardExpiryElement
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onReady={handleReady}
                        style={style}
                    />
                    <Typography>
                        CVC
                    </Typography>
                    <CardCvcElement
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onReady={handleReady}
                        style={style}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button className={classes.pay} onClick={handlePay}>Pay</Button>
                <Button className={classes.cancel} onClick={handleCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default injectStripe(Payment);
