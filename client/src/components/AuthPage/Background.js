import React from "react";
import {
  makeStyles,
  Box,
  Typography,
} from "@material-ui/core";
import BackgroundImage from "../../assets/images/bg-img.png";
import Bubble from "../../assets/images/bubble.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',

    '&::before': {
      background: 'linear-gradient(to bottom, #3A8DFF, #86B9FF)',
      opacity: '0.85',
      width: '100%',
      height: '100%',
      content: '""',
      position: 'absolute',
    }
  },
  content: {
    position: 'absolute',
    bottom: '45%',
    left: 0,
    width: '100%',
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    textAlign: 'center',
  },
  description: {
    fontSize: '26px',
    color: 'white',
    lineHeight: '1.75',
    marginTop: theme.spacing(3),
  }
}));

const Background = () => {
  const classes = useStyles();

  return (
    <Box component="div" className={classes.root}>
      <Box component="div" className={classes.content}>
        <img src={Bubble} alt="Bubble" />
        <Typography className={classes.description}>Converse with anyone with any language</Typography>
      </Box>
    </Box>
  )
}

export default Background;