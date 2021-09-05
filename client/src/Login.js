import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  makeStyles,
  Grid,
  Box,
  Hidden,
  Typography,
  Button,
  FormControl,
  TextField,
  InputAdornment,
  Link,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
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
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    await login({ email, password });
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
          <Typography color="secondary">Don't have an account?</Typography>
          <Button onClick={() => history.push("/register")} variant="contained" size="large" className={classes.link}>Create account</Button>
        </Box>
        <Grid item xs={12} className={classes.form}>
          <form onSubmit={handleLogin}>
            <Typography component="h2" className={classes.title}>Welcome back!</Typography>
            <FormControl margin="normal" required fullWidth>
              <TextField
                size="medium"
                aria-label="e-mail address"
                label="E-mail address"
                name="email"
                type="email"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                size="medium"
                label="Password"
                aria-label="password"
                type="password"
                name="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end"><Link href="#" onClick={() => {}} className={classes.forgot} color="primary">Forgot?</Link></InputAdornment>
                  )
                }}
              />
            </FormControl>
            <Grid container justifyContent="center">
              <Button type="submit" variant="contained" size="large" className={classes.submit} color="primary">
                Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
