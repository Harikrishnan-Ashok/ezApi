import {Typography} from "@mui/material"
import useEndpoinListHook from "./hooks/useEndpoinListHook"
export default function AllEndpoints() {

	const {listOfEndpoints, guestMode} = useEndpoinListHook()

	if (listOfEndpoints.length <= 0) {
		return <Typography variant="h6">{guestMode ? "Ola there Guest, create some endpoints to get started." : "no endpoints added"}</Typography>
	}
	else {
		return <Typography variant="h5">list of Endpoints</Typography>
	}
}
