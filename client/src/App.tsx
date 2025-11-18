import {Stack} from "@mui/material";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import LandingPage from "./pages/landingPage/landingPage";
import MainLayout from "./pages/MainLayout";
import AllEndpoints from "./components/allEndpoints/AllEndpoints";
import EndpointDetails from "./components/endpointDetails/EndpointDetails";

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
				<Route path="/home" element={<MainLayout />}>
					<Route path=":entity" element={<Outlet></Outlet>}>
						<Route path="all_endpoints" element={<AllEndpoints />} ></Route>
						<Route path="add_new_endpoint" element={<EndpointDetails />} ></Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter >
	)
}

export default App;
