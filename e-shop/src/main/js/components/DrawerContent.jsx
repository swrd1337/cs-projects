import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
    nav: {
        width: '100%',
    }
});

export default function DrawerContent(props) {
    const { category, setCategory, setDrawerOpen } = props;
    const classes = useStyles();
    const [reload, setReload] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(category ? category.id : 0);

    const handleListItemClick = (event, category) => {
        setSelectedIndex(category.id);
        if (category.id) {
            setCategory(category);
        } else {
            setCategory(null);
        }
        setDrawerOpen(false);
    };

    useEffect(() => {
        fetch('/public/api/categories', {
            method: 'GET'
        }).then(response => {
            if (response.status && response.status === 200) {
                return response.json();
            }
        }).then(data => {
            setCategories(data);
        })
    }, [reload]);

    return (
        <List component='nav' className={classes.nav}>
            <ListItem 
                button 
                key='all_cats'
                selected={selectedIndex === 0}
                onClick={e => handleListItemClick(e, {id: 0})}
            >
                <ListItemText primary='All items'/>
            </ListItem>
            {
                categories.map(category => 
                    <ListItem 
                        button 
                        key={category.id}
                        selected={selectedIndex === category.id}
                        onClick={e => handleListItemClick(e, category)}
                    >
                        <ListItemText primary={category.name}/>
                    </ListItem>
                )
            }
        </List>
    );
}