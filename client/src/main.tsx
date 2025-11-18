import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {darkTheme, lightTheme} from './theme/theme'
import {Provider} from 'react-redux'
import {store} from './store/store'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Provider store={store} >
				<App />
			</Provider>
		</ThemeProvider>
	</StrictMode>,
)
