import {createTheme} from "@mui/material";

export const basetheme = createTheme({
	typography: {
		fontFamily: "Goldman, sans-serif",
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					position: "static",
					width: "100%",
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: ({theme}) => ({
					// background: theme.palette.background.paper
					background: theme.palette.background.paper
				}),
			},
		},
	},
});

export const lightTheme = createTheme(basetheme, {
	palette: {
		mode: "light",
		primary: {main: "#4064a5"},
		secondary: {main: "#aa44aa"},
		success: {main: "#4caf50"},
		error: {main: "#f44336"},
		warning: {main: "#ffca28"},
		info: {main: "#9fc9ff", contrastText: "#000000"},
		background: {default: "#fafafa", paper: "#f0f0f0"},
		text: {primary: "#000000"},
	},
});


export const darkTheme = createTheme(basetheme, {
	palette: {
		mode: "dark",
		primary: {main: "#1c1c1c"},
		secondary: {main: "#3b3b3b"},
		success: {main: "#1c4e1c"},
		error: {main: "#a01010"},
		warning: {main: "#c7a312"},
		info: {main: "#4a4a4a"},
		background: {default: "#202020", paper: "#2a2a2a"},
		text: {primary: "#fcfcfc"},
	},
});
