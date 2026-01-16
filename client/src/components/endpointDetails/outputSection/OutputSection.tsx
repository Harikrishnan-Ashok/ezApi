import { Stack, TextField } from "@mui/material"
import { EndpointDetailsType } from "../types"

type Props = {
	output: EndpointDetailsType["output"]
	send: (event: {
		type: "UPDATE_FIELD"
		key: "output"
		value: string
	}) => void
}

export default function OutputSection({ output, send }: Props) {
	return (
		<Stack mt={2}>
			<TextField
				multiline
				fullWidth
				minRows={29}
				value={output}
				onChange={(e) =>
					send({
						type: "UPDATE_FIELD",
						key: "output",
						value: e.target.value,
					})
				}
			/>
		</Stack>
	)
}
