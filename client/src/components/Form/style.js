import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    borderRadius: '12px',
    background: 'linear-gradient(180deg, rgb(255 192 146 / 85%) 48%, rgb(253 226 52 / 0.71) 100%)',
  },
  heading: {
    background: 'rgb(248 172 78) 58%;',
    borderRadius: '12px',
    width: '380px!important',
    height: '55px',
  },
  contents: {
    padding: theme.spacing(2),
  },
  inputBox: {
    marginBottom: '10px',
    background: '#FFFFF1',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    background:'#FFB800',
    color:'white', 
    bprderRadius: '7px', 
    width: '149px',
    marginLeft: '90px', 
  },
}));
