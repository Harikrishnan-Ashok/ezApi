import {createTheme} from "@mui/material";

export const basetheme = createTheme({
	typography: {
		fontFamily: " Goldman,sans-serif"
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					position: "static",
					width: "100%"
				}
			}
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: "#9f9f9f"
				}
			}
		}
	}
})
