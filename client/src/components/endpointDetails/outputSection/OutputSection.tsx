import { Stack, TextField } from "@mui/material";
import { EndpointDetailsType } from "../types";


type props = {
	endpointDetails: EndpointDetailsType,
	setEndpointDetails: React.Dispatch<React.SetStateAction<EndpointDetailsType>>
}
export default function OutputSection({ endpointDetails, setEndpointDetails }: props) {
	return (
		<Stack mt={2}>
			<TextField value={JSON.stringify(endpointDetails.output)} sx={{ flexGrow: 1 }} minRows={29} multiline fullWidth ></TextField>
		</Stack>
	)
}
