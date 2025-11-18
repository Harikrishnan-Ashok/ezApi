import {AppBar, Button, Stack, Toolbar, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function Navbar() {
	const navigate = useNavigate()
	const {entity} = useParams()
	const [selectedPage, setSelectedPage] = useState("all")

	const handleAllEndpointClick = () => {
		navigate(`${entity}/all_endpoints`)
		setSelectedPage("all")
	}

	const handleAddNewEndpointClick = () => {
		navigate(`${entity}/add_new_endpoint`)
		setSelectedPage("new")
	}

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h4">EzApi</Typography>
				<Stack sx={{flexGrow: 1}} ></Stack>
				<Stack gap={1} direction={"row"} justifyContent={"flex-end"} alignItems={"center"} >
					<Button onClick={() => handleAllEndpointClick()} color={selectedPage === "new" ? "primary" : "info"} size="medium" variant="contained">All Endpoints</Button>
					<Button onClick={() => handleAddNewEndpointClick()} color={selectedPage === "all" ? "primary" : "info"} size="medium" variant="contained">Add New Endpoint</Button>
				</Stack>
			</Toolbar>
		</AppBar >
	);
}
