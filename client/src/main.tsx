import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {basetheme} from './theme/theme'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme={basetheme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</StrictMode>,
)
