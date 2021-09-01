import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  makeStyles,
  Grid,
  Hidden,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import BackgroundPanel from "./components/AuthPage/Background";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  main: {
    position: 'relative',
    height: '100%',
  },
  float: {
    position: 'absolute',
    right: theme.spacing(5),
    top: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    background: 'white',
    marginLeft: theme.spacing(4),
    color: theme.palette.primary.main,
  },
  form: {
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
  title: {
    fontSize: 26,
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  forgot: {
    fontSize: 12,
    fontWeight: 600,
  },
  submit: {
    marginTop: theme.spacing(6),
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontFamily: "Montserrat",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register } = props;

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root}>
      <Hidden only={['xs', 'sm']}>
        <Grid item md={5}>
          <BackgroundPanel />
        </Grid>
      </Hidden>
      <Grid container item sm={12} md={7} className={classes.main} justifyContent="center" alignItems="center">
        <Box className={classes.float}>
          <Typography color="secondary">Already have an account?</Typography>
          <Button onClick={() => history.push("/login")} variant="contained" size="large" className={classes.link}>Login</Button>
        </Box>
        <Grid item xs={12} className={classes.form}>
          <form onSubmit={handleRegister}>
            <Typography component="h2" className={classes.title}>Create an account.</Typography>
            <FormControl margin="normal" required fullWidth>
              <TextField
                size="medium"
                aria-label="username"
                label="Username"
                name="username"
                type="text"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                size="medium"
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                size="medium"
                aria-label="password"
                label="Password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="password"
              />
            </FormControl>
            <Grid container justifyContent="center">
              <Button type="submit" variant="contained" size="large" className={classes.submit} color="primary">
              Create
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
