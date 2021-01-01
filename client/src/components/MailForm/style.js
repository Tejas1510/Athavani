import { makeStyles } from "@material-ui/core/styles"

export default makeStyles((theme) => ({
    root: {
        width: '100%',
        '& .MuiInputBase-formControl': {
            background: 'white',
            borderColor: 'black',
            borderRadius: '5px'
        }
    }
}));
