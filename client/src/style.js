import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    "& .active": {
      visibility: "visible",
      opacity: "1",
    },
  },
  heading: {
    color: '#443f37',
    fontWeight: '900',
    fontFamily: 'cursive',
  },
  image: {
    marginLeft: '15px',
  },
  menuIcon: {
    position: "absolute",
    right: "5px",
    width: "40px",
    height: "40px",
    objectFit: "cover",
    borderRadius: "100%",
    border: "1px solid grey",
  },
  menuBox: {
    position: 'absolute',
    top: "55px",
    right: '5px',
    backgroundColor: "#fe3939",
    width: "130px",
    padding: "0px",
    margin: "0",
    borderRadius: "15px",
    transition: "0.5s",
    visibility: "hidden",
    opacity: "0",
    zIndex: "9999",
    "& ul": {
      margin: "0",
      padding: "0",
      "& li": {
        listStyle: "none",
        padding: "10px 0",
        textAlign: "center",
        transition: "0.5s",
        cursor: "pointer",
        "& h1": {
          color: "white",
          fontSize: "1.5em",
          fontWeight: "400",
          paddingBottom: "5px",
        },
        "&:hover": {
          backgroundColor: "#f2aa4c",
        }
      }
    }
  },
  logout: {
    color: 'white',
    fontFamily: 'cursive',
    fontSize: '1.3rem',
    position: 'absolute',
    right: '25px',
    textTransform: 'none',
    borderRadius: '5px'
  },
  [theme.breakpoints.down('sm')]:{
    mainContainer:{
      flexDirection:'column-reverse'
    },
  }
}));