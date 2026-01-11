import { Stack, TextField } from "@mui/material";
import { EndpointDetailsType } from "../types";

type props = Pick<EndpointDetailsType, | "output">

export default function OutputSection({ output }: props) {
	return (
		<Stack mt={2}>
			<TextField value={JSON.stringify(output)} sx={{ flexGrow: 1 }} minRows={29} multiline fullWidth ></TextField>
		</Stack>
	)
}
