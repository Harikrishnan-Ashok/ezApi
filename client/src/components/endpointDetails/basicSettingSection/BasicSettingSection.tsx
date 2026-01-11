import { Autocomplete, IconButton, InputAdornment, Stack, Switch, TextField, Tooltip, Typography } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { delayHint, handleDelayTimeoutChange, handleEnableDelay, handleStatusChange, handleMethodChange, handlePathChange, httpStatus, methods } from "../utils/basicSettingsUtils";
import { EndpointDetailsType } from "../types";

type basicSectionProps = {
	endpointDetails: EndpointDetailsType,
}

export default function BasicSettingSection({ endpointDetails }: basicSectionProps) {

	return (
		<>
			<Stack gap={1} mt={2} alignItems={"start"} direction={"row"} >
				<Autocomplete
					disablePortal options={methods} sx={{ width: 300 }} value={endpointDetails.method}
					onChange={() => alert("tried to change method autocomplete")}
					renderInput={(params) => <TextField {...params} label="Method" />}
				/>
				<TextField
					value={endpointDetails.path}
					onChange={() => alert("trying to change the path")}
					label="path:" placeholder={`enter absolute path here. (ie.  starting with /)`} fullWidth={true}>
				</TextField>
			</Stack>
			<Stack gap={2} justifyContent={"start"} mt={2} direction={"row"} alignItems={"center"} >
				<Typography variant="subtitle1" > Add a delay :</Typography>
				<Switch value={endpointDetails.enableDelay}
					onChange={() => alert("trying to change the de;ay")}
					color="info" >
				</Switch>
				{endpointDetails.enableDelay &&
					<TextField
						type="number"
						value={endpointDetails.delayTimeout}
						onChange={() => alert("trying to change the de;ay")}
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
					getOptionLabel={(option) => option.label}
					value={httpStatus.find(status => status.value === endpointDetails.statusCode) || null}
					onChange={() => alert("trying to change the de;ay")}
					sx={{ width: 400 }}
					renderInput={(params) => <TextField {...params} label="Http Status" />}
				/>
			</Stack>
		</>
	)
}
