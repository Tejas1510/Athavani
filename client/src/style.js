import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  heading: {
    color: '#443f37',
    fontWeight: '900',
    fontFamily: 'cursive',
  },
  image: {
    marginLeft: '15px',
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