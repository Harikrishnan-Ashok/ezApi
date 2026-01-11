import { Paper, Stack, Typography } from "@mui/material";
import ConnectionSection from "./connectionSection/ConnectionSection";
import BasicSettingSection from "./basicSettingSection/BasicSettingSection";
import OutputSection from "./outputSection/OutputSection";
import { useMachine } from "@xstate/react";
import { endpointDetailsMachine } from "./endpointDetailsMachine";


export default function EndpointDetails() {
	const [state, send] = useMachine(endpointDetailsMachine)
	return (
		<Stack flexGrow={1} direction={"row"} gap={1} p={1} >
			<Stack flex={1}>
				<Paper sx={{ p: 1, height: "100%", width: "100%" }}>
					<Typography variant="h5" >Output</Typography>
					<OutputSection output={state.context.data.output}></OutputSection>
				</Paper>
			</Stack>
			<Stack flex={1} gap={1}>
				<Paper sx={{ flex: 5, p: 1, height: "100%", width: "100%" }}>
					<Stack>
						<Typography alignSelf={"start"} variant="h5" >Basic Settings</Typography>
						<BasicSettingSection
							method={state.context.data.method}
							path={state.context.data.path}
							delayTimeout={state.context.data.delayTimeout}
							enableDelay={state.context.data.enableDelay}
							statusCode={state.context.data.statusCode} >
						</BasicSettingSection>
					</Stack>
				</Paper>
				<Paper sx={{ flex: 1, p: 1, height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
					<Typography alignSelf="start" variant="h5">
						Connection Settings
					</Typography>
					<ConnectionSection isIdle={state.matches("IDLE")} send={send} />
				</Paper>
			</Stack>
		</Stack >
	)
}
