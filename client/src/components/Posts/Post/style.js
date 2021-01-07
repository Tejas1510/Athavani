import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "10px",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  title: {
    padding: "0 16px",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
  cardContent :{
    display : "none",
  } , 
  bleh :{
    
  } ,
  paper: {
    position: "absolute",
    maxWidth: 400,
    minWidth: 200,
    height: "max-content",
    backgroundColor: "#FFE9BD",
    border: "2px solid #000",
    padding: "50px",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    margin: "auto",
    textAlign: "center",
  },
  paperButton: {
    backgroundColor: "#FFAA00 !important",
  },
  customInput: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FFAA00",
      },
      "&:hover fieldset": {
        borderColor: "#FFAA00",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFAA00",
      },
    },
  },
  ".MuiOutlinedInput-root.Mui-focused": {
    color: "#FFAA00",
  },
  overlayerror :{
    position:'fixed',
    width: '100%',
    height: '100%',
    zIndex: '99'
  }
});