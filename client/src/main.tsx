import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {darkTheme, lightTheme} from './theme/theme'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</StrictMode>,
)
