import { Autocomplete, IconButton, InputAdornment, Stack, Switch, TextField, Tooltip, Typography } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { delayHint, httpStatus, methods } from "../utils/basicSettingsUtils";
import { EndpointDetailsType } from "../types";

type basicSectionProps = Pick<EndpointDetailsType, "method" | "path" | "enableDelay" | "delayTimeout" | "statusCode"> & {
	send: <K extends keyof EndpointDetailsType> (event: { type: "UPDATE_FIELD", key: K, value: EndpointDetailsType[K] }) => void
}

const getStatus = (val: number) => {
	console.log("getting status")
	return (
		httpStatus.find(item => item.value === val)
		?? httpStatus[0]
	)
}


export default function BasicSettingSection({ method, path, enableDelay, delayTimeout, statusCode, send }: basicSectionProps) {

	return (
		<>
			<Stack gap={1} mt={2} alignItems={"start"} direction={"row"} >
				<Autocomplete
					disablePortal options={methods} sx={{ width: 300 }} value={method}
					onChange={(_, val) => send({ type: "UPDATE_FIELD", key: "method", value: val ?? "GET" })}
					renderInput={(params) => <TextField {...params} label="Method" />}
				/>
				<TextField
					value={path}
					onChange={(e) => send({ type: "UPDATE_FIELD", key: "path", value: e.target.value })}
					label="path:" placeholder={`enter absolute path here. (ie.  starting with /)`} fullWidth={true}>
				</TextField>
			</Stack>
			<Stack gap={2} justifyContent={"start"} mt={2} direction={"row"} alignItems={"center"} >
				<Typography variant="subtitle1" > Add a delay :</Typography>
				<Switch value={enableDelay}
					onChange={() => send({ type: "UPDATE_FIELD", key: "enableDelay", value: !enableDelay })}
					color="info" >
				</Switch>
				{enableDelay &&
					<TextField
						type="number"
						value={delayTimeout}
						onChange={(e) => send({ type: "UPDATE_FIELD", key: "delayTimeout", value: Number(e.target.value) })}
						variant="standard" size="small" sx={{ width: "25%" }}
						slotProps={{
							input: {
								endAdornment: (
									<InputAdornment position="end" sx={{ color: "inherit" }}>
										<Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>ms</Typography>
									</InputAdornment>
								),
								inputProps: {
									style: { textAlign: "right" }
								}
							}
						}}
					></TextField>
				}
				<Tooltip placement="right-start" title={delayHint}>
					<IconButton color="secondary" size="small">
						<HelpOutlineIcon></HelpOutlineIcon>
					</IconButton>
				</Tooltip>
			</Stack >
			<Stack mt={2}>
				<Autocomplete
					disablePortal
					options={httpStatus}
					value={getStatus(statusCode)}
					onChange={(_, val) => { send({ type: "UPDATE_FIELD", key: "statusCode", value: val?.value ?? 200 }) }}
					sx={{ width: 400 }}
					renderInput={(params) => <TextField {...params} label="Http Status" />}
				/>
			</Stack>
		</>
	)
}
