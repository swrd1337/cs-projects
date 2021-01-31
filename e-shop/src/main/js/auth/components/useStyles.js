import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY_1, PRIMARY_2 } from '../../constants/Colors';

export const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: PRIMARY_1,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    rememberMe: {
        color: `${PRIMARY_2} !important`,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        borderRadius: '0',
        backgroundColor: PRIMARY_2,
        '&:hover': {
            backgroundColor: PRIMARY_1,
        }
    },
    link: {
        color: PRIMARY_1,
    }
}));