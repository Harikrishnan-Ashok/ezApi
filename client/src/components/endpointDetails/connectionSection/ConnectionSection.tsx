import {Button, Stack} from "@mui/material";
import {EndpointDetailsType} from "../utils/endpointUtils";

type props = {
	endpointDetails: EndpointDetailsType,
	setEndpointDetails: React.Dispatch<React.SetStateAction<EndpointDetailsType>>
}

export default function ConnectionSection({endpointDetails, setEndpointDetails}: props) {
	return (
		<Stack
			direction="row" gap={1} sx={{marginTop: "auto", alignSelf: "flex-end"}}>
			<Button variant="contained" color="error">Remove This Endpoint</Button>
			<Button variant="contained" color="primary">Save</Button>
		</Stack>

	)
}
