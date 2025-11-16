import {Button, Paper, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {handleGuestLogin, handleUserLogin, handleUserSignUp} from "./utils/loginUtils";
import {useState} from "react";

export default function LandingPage() {

	const navigate = useNavigate()
	const [showForm, setShowForm] = useState(false)

	return (
		<>
			<Paper sx={{minWidth: "50%"}}>
				<Stack margin={5} justifyContent={"center"} alignItems={"center"}>
					<Stack alignItems={"center"} >
						<Typography variant="h2">
							EzApi
						</Typography>
						<Typography variant="subtitle1">
							A handy tool to make your chores a bit eaiser
						</Typography>
					</Stack>
					<Stack mt={3} gap={2} >
						<Button onClick={() => handleGuestLogin(navigate)} color="primary" variant="contained"> Login as a Guest </Button>
						{showForm ?
							<Stack gap={2} direction={"row"}>
								<Button onClick={() => handleUserLogin(navigate)} color="primary" variant="contained">Been here before</Button>
								<Button onClick={() => handleUserSignUp(navigate)} color="primary" variant="contained">Sign me up buddy</Button>
							</Stack> :
							<Button onClick={() => setShowForm(true)} color="primary" variant="contained">i prefer account</Button>
						}
					</Stack>
				</Stack>
			</Paper>
		</>
	)
}
