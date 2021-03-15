import makeStyles from "@material-ui/core/styles/makeStyles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const defaultTheme = createMuiTheme({
  breakpoints: {
    values: {
      ss: 0,
      xs: 350,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    type: "dark",
    primary: {
      main: '#159095',
    },
  },
});

export const lightTheme = createMuiTheme({
  breakpoints: {
    values: {
      ss: 0,
      xs: 350,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    type: "light",
    primary: {
      main: '#159095',
    },
  },
});

export const useDefaultStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
  },
}));
