import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";

const primaryColor = "#184db8";
const secondaryColor = "#86ad34";
const errorColor = "#ee4c4b";
const warningColor = "#fed94f";

export const themeAstronaut = {
  overrides: {
    MuiAvatar: {
      img: {
        backgroundColor: `${secondaryColor}40`,
      },
    },
    MuiDialog: {
      paper: {
        "@media (max-width:600px)": {
          margin: 0,
        },
      },
      paperFullWidth: {
        "@media (max-width:600px)": {
          width: "100%",
        },
      },
      paperScrollPaper: {
        "@media (max-width:600px)": {
          height: "calc( 100% - 20px )",
          maxHeight: "calc( 100% - 20px )",
        },
      },
    },
    MuiInputBase: {
      root: { fontSize: "0.8rem" },
    },
    MuiFormLabel: {
      root: { fontSize: "0.8rem" },
    },
    MuiButton: {
      root: {
        minWidth: 24,
      },
    },
    MuiToolbar: {
      regular: {
        minHeight: 56,
        "@media (min-width:0px) and (orientation: landscape)": {
          minHeight: 48,
        },
        "@media (min-width:600px)": {
          minHeight: 56,
        },
      },
    },
  },
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    error: {
      main: errorColor,
    },
    warning: {
      main: warningColor,
    },
    text: {
      primary: "#3f2a55",
      secondary: `#3f2a5580`,
    },
    background: {
      paper: "#fff",
      default: "#78549e",
    },
  },
  text: {
    small: {
      fontSize: "0.7rem",
    },
  },
  avatar: {
    objectFit: "cover",
    objectPosition: "center center",
    marginTop: 8,
    marginBottom: 8,
    padding: 0,
    borderRadius: "50%",
    backgroundColor: `${secondaryColor}40`,
    border: `1px solid ${secondaryColor}40`,
  },
};

let theme = createMuiTheme(themeAstronaut);
theme = responsiveFontSizes(theme);

export default theme;
