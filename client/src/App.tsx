import {Stack} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./pages/landingPage/landingPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<Stack
							justifyContent="center"
							alignItems="center"
							width="100vw"
							height="100vh"
						>
							<LandingPage />
						</Stack>
					}>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App;
