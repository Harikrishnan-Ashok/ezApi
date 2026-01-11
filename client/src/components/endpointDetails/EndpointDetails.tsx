import { Paper, Stack, Typography } from "@mui/material";
import ConnectionSection from "./connectionSection/ConnectionSection";
import BasicSettingSection from "./basicSettingSection/BasicSettingSection";
import OutputSection from "./outputSection/OutputSection";
import { useState } from "react";
import { callXstateFn, defaultEndpointDetails } from "./utils/endpointUtils";
import { EndpointDetailsType } from "./types";


export default function EndpointDetails() {
	const [endpointDetails, setEndpointDetails] = useState<EndpointDetailsType>(defaultEndpointDetails)
	return (
		<Stack flexGrow={1} direction={"row"} gap={1} p={1} >
			<Stack flex={1}>
				<Paper sx={{ p: 1, height: "100%", width: "100%" }}>
					<Typography variant="h5" >Output</Typography>
					<OutputSection endpointDetails={endpointDetails}></OutputSection>
				</Paper>
			</Stack>
			<Stack flex={1} gap={1}>
				<Paper sx={{ flex: 5, p: 1, height: "100%", width: "100%" }}>
					<Stack>
						<Typography alignSelf={"start"} variant="h5" >Basic Settings</Typography>
						<BasicSettingSection endpointDetails={endpointDetails}></BasicSettingSection>
					</Stack>
				</Paper>
				<Paper sx={{ flex: 1, p: 1, height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
					<Typography alignSelf="start" variant="h5">
						Connection Settings
					</Typography>
					<ConnectionSection endpointDetails={endpointDetails} saveDetails={(newDeats) => callXstateFn("SAVE_ENDPOINT", newDeats)} />
				</Paper>
			</Stack>
		</Stack >
	)
}
