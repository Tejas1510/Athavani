import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    
    padding: "0 15px",
    margin: "0",
    borderRadius:"8px",
    borderShadow:"5px 10px  8px rgba(255, 0, 0, 0),",
    marginTop: "15px",
    
    
    
   
    
  },
  p:{
    fontSize:"20px",
    fontFamily: "Roboto, sans-serif",
    marginRight:"8px"
    
  },
  heading: {
    
    borderRadius: "8px",
    width: '380px!important',
    height: '55px',
  },
  contents: {
    padding: theme.spacing(2),
    borderRadius:'17px'
  },
  inputBox: {
   
    
    borderColor: 'pink',
    marginBottom:"15px",
    boxShadow:"4px 7px 11px #527a7a"
    


  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    borderShadow:"5px 10px  8px red"

    
    
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
    color:"#004080"
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
    fontWeight:"Bold"
  },
  buttonClear: {
    marginBottom: 10,
    background:'#ff0000',
    color:'white', 
    borderRadius: '7px', 
    width: '149px',
    fontWeight:"Bold"
  },
}));
