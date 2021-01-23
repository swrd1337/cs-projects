import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { PRIMARY_1, PRIMARY_2 } from '../../constants/Colors';

const CustomTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: PRIMARY_1,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: 0,
            },
            '&:hover fieldset': {
                borderColor: PRIMARY_2,
            },
            '&.Mui-focused fieldset': {
                borderColor: PRIMARY_1,
            },
        },
    },
})(TextField);

export default CustomTextField;