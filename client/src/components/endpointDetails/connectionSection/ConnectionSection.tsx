import { Button, Stack } from "@mui/material";

type ConnectionSectionEvents = | { type: "PRIMARY" } | { type: "CANCEL" }

type props = {
	isIdle: boolean
	send: (event: ConnectionSectionEvents) => void
}

export default function ConnectionSection({ isIdle, send }: props) {
	return (
		<Stack
			direction="row" gap={1} sx={{ marginTop: "auto", alignSelf: "flex-end" }}>
			{!isIdle &&
				<Button variant="contained" color="error" onClick={() => { send({ type: "CANCEL" }) }} >Cancel</Button>
			}
			<Button variant="contained" color="primary" onClick={() => { send({ type: "PRIMARY" }) }} >{isIdle ? "EDIT" : "SAVE"}</Button>
		</Stack >

	)
}
