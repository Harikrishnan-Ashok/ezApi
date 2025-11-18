import {Outlet} from "react-router-dom";
import Navbar from "../commonComponents/Navbar";
import {Stack} from "@mui/material";

export default function MainLayout() {
	return (
		<Stack height={"100vh"} width={"100vw"} flexDirection={"column"} display={"flex"}>
			<Navbar></Navbar>
			<Stack height={"100%"} width={"100%"} flexGrow={1} >
				<Outlet></Outlet>
			</Stack>
		</Stack>
	)
}
