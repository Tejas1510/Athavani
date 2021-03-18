import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    borderRadius: '12px',
    background: "#FF7F50",
    borderRadius: "20px"
  },
  heading: {
    background: 'rgb(248 172 78) 58%;',
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    width: '380px!important',
    height: '55px',
  },
  contents: {
    padding: theme.spacing(2),
    borderRadius:'10px'
  },
  inputBox: {
    background: 'rgb(248 172 78) 58%;',
    borderRadius:'10px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  error: {
    marginTop: '11px'
  },
  fileUpload: {
    position: "relative",
    cursor: "pointer",
  },
  fileUploadIcon: {
    fontSize: "3.5em",
    cursor: "pointer",
  },
  fileInput: {
    position: "absolute",
    left: "5px",
    top: "5px",
    width: '97%',
    minHeight: "50px",
    margin: '10px 0',
    opacity: "0",
    cursor: "pointer",
  },
  buttons: {
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: "column",
    marginTop: "10px",
  },
  buttonSubmit: {
    marginBottom: 10,
    background:'#FFB800',
    color:'white', 
    borderRadius: '7px', 
    width: '149px',
  },
  buttonClear: {
    marginBottom: 10,
    background:'#ff0000',
    color:'white', 
    borderRadius: '7px', 
    width: '149px',
  },
}));
