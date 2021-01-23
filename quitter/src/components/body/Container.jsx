import { useEffect, useState } from 'react';
import { Button, Grid } from "@material-ui/core";
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';
import { updatePosts } from '../../actions/common';
import { makeStyles } from '@material-ui/core/styles';
import { withFirebase } from '../../context';

const useStyles = makeStyles((theme) => ({
    buttonContaier: {
        margin: 'auto'
    },
    button: {
        borderRadius: '20px',
        fontSize: '12px',
        height: '28px',
        width: '10em'
    }
}));


function Container(props) {
    const { firebase } = props;
    const [userData, setUserData] = useState(null);
    const [selectedTab, setSelectedTab] = useState('latest');
    const update = useSelector(state => state.common.updatePosts);
    const user = useSelector(state => state.common.user);

    const dispatch = useDispatch();

    const classes = useStyles();

    const getPosts = callback => {
        callback(data => {
            if (update) {
                setUserData(data);
                dispatch(updatePosts({ update: false }));
            }
        });
    }

    useEffect(() => {
        if (selectedTab === 'userData') {
            getPosts(firebase.getUserPosts);
        } else {
            getPosts(firebase.getAllPosts);
        }
    }, [update]);


    const onClick = id => {
        dispatch(updatePosts({ update: true }));
        if (id === 'userData') {
            setSelectedTab('userData');
            getPosts(firebase.getUserPosts);
        } else {
            setSelectedTab('latest');
            getPosts(firebase.getAllPosts);
        }
    };

    return (
        <Grid container item justify='center'>
            <Grid item container spacing={6} justify='center' wrap='nowrap' className={classes.buttonContaier}>
                <Grid item>
                    <Button
                        className={classes.button}
                        variant={selectedTab === 'latest' ? 'contained' : 'outlined'}
                        disableElevation
                        onClick={onClick}
                    >
                        Latest
                    </Button>
                </Grid>
                {user && <Grid item>
                    <Button
                        className={classes.button}
                        variant={selectedTab === 'userData' ? 'contained' : 'outlined'}
                        disableElevation
                        onClick={() => onClick('userData')}
                    >
                        My posts
                    </Button>
                </Grid>}
            </Grid>
            {
                userData && userData.map(value => {
                    return <Post key={value.id} data={value} />
                })
            }
        </Grid>
    )
}

export default withFirebase(Container);