import {Button, Paper, Stack, Typography} from "@mui/material";

export default function LandingPage() {
	return (
		<>
			<Paper sx={{minWidth: "50%"}}>
				<Stack margin={10} justifyContent={"center"} alignItems={"center"}>
					<Stack alignItems={"center"} >
						<Typography variant="h2">
							EzApi
						</Typography>
						<Typography variant="subtitle1">
							a handy tool to make your chores a bit eaiser
						</Typography>
					</Stack>
					<Stack mt={3} gap={1} >
						<Button onClick={() => alert("logging in as guest")} variant="contained"> Login as a Guest </Button>
						<Button onClick={() => alert("call sign up page")} variant="contained"> Sign in using email </Button>
					</Stack>
				</Stack>
			</Paper>
		</>
	)
}
