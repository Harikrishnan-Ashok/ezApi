import { Stack, TextField } from "@mui/material";
import { EndpointDetailsType } from "../types";

//defining props type
type outputSectionProps = {
	endpointDetails: EndpointDetailsType
}

export default function OutputSection({ endpointDetails }: outputSectionProps) {
	return (
		<Stack mt={2}>
			<TextField value={JSON.stringify(endpointDetails.output)} sx={{ flexGrow: 1 }} minRows={29} multiline fullWidth ></TextField>
		</Stack>
	)
}
