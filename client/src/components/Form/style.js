import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    background:
      "linear-gradient(180deg, rgb(255 192 146 / 85%) 48%, rgb(253 226 52 / 0.71) 100%)",
    borderRadius: "1.5rem",
    margin: "0 auto",
    marginRight: "54px",
    transform: "translate(-4px, 14px)",
  },
  heading: {
    background: "rgb(248 172 78) 58%",
    borderRadius: "2rem",
    marginTop: "12px",
    padding: "10px",
  },
  contents: {
    padding: theme.spacing(2),
    borderRadius: "10px",
  },
  inputBox: {
    background: "#FFFFF1",
    borderRadius: "10px",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  error: {
    marginTop: "11px",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
    background: "#FFB800",
    color: "white",
    borderRadius: "7px",
    width: "149px",
    marginLeft: "28%",
    marginRight: "50px",
  },
  buttonClear: {
    marginBottom: 10,
    background: "#ff0000",
    color: "white",
    borderRadius: "7px",
    width: "149px",
    marginLeft: "28%",
    marginRight: "50px",
  },
}));
