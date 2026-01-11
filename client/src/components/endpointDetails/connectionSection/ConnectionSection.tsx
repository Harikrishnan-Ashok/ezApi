import { Button, Stack } from "@mui/material";
import { EndpointDetailsType } from "../types";

type props = {
	endpointDetails: EndpointDetailsType
	saveDetails: (newDeats: EndpointDetailsType) => void
}

export default function ConnectionSection({ endpointDetails, saveDetails }: props) {
	return (
		<Stack
			direction="row" gap={1} sx={{ marginTop: "auto", alignSelf: "flex-end" }}>
			<Button variant="contained" color="error">Remove This Endpoint</Button>
			<Button variant="contained" color="primary" onClick={() => saveDetails(endpointDetails)} >Save</Button>
		</Stack >

	)
}
