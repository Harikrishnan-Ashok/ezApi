import {createTheme} from "@mui/material";

export const basetheme = createTheme({
	typography: {
		fontFamily: "Goldman",
		fontSize: 14
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
					background: theme.palette.background.paper
				}),
			},
		},
		MuiButton: {
			styleOverrides: {
				sizeSmall: {
					fontSize: "0.70rem",
					padding: "2px 8px",
					minHeight: "28px"
				},
				sizeMedium: {
					fontSize: "0.80rem",
					padding: "4px 12px",
					minHeight: "34px"
				},
				sizeLarge: {
					fontSize: "0.90rem",
					padding: "6px 16px",
					minHeight: "40px"
				}
			}
		}
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
		success: {main: "#1cae1c"},
		error: {main: "#a01010"},
		warning: {main: "#c7a312"},
		info: {main: "#4a76bd"},
		background: {default: "#202020", paper: "#2a2a2a"},
		text: {primary: "#fcfcfc"},
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: ({theme}) => ({
					color: theme.palette.text.primary,
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: theme.palette.info.main,
					},
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: theme.palette.info.main,
					},
					"& .MuiInputBase-input": {
						color: theme.palette.text.primary, // the actual text color
					},
				}),
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: ({theme}) => ({
					color: theme.palette.text.primary,
					"&.Mui-focused": {
						color: theme.palette.info.main,
					},
				}),
			},
		},
	},
});

