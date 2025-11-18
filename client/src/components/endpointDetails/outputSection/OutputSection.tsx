import {Stack, TextField} from "@mui/material";
import {EndpointDetailsType} from "../utils/endpointUtils";

type props = {
	endpointDetails: EndpointDetailsType,
	setEndpointDetails: React.Dispatch<React.SetStateAction<EndpointDetailsType>>
}
export default function OutputSection({endpointDetails, setEndpointDetails}: props) {
	return (
		<Stack mt={2}>
			<TextField sx={{flexGrow: 1}} minRows={27} multiline fullWidth ></TextField>
		</Stack>
	)
}
