import {Autocomplete, IconButton, InputAdornment, Stack, Switch, TextField, Tooltip, Typography} from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {delayHint, handleDelayTimeoutChange, handleEnableDelay, handleMethodChange, handlePathChange, httpStatus, methods} from "../utils/basicSettingsUtils";
import {EndpointDetailsType, EndpointDetailsSetterType} from "../types";

type props = {
	endpointDetails: EndpointDetailsType,
	setEndpointDetails: EndpointDetailsSetterType
}

export default function BasicSettingSection({endpointDetails, setEndpointDetails}: props) {

	return (
		<>
			<Stack gap={1} mt={2} alignItems={"start"} direction={"row"} >
				<Autocomplete
					disablePortal options={methods} sx={{width: 300}} value={endpointDetails.method}
					onChange={(_, value) => handleMethodChange(value ?? "", setEndpointDetails)}
					renderInput={(params) => <TextField {...params} label="Method" />}
				/>
				<TextField
					value={endpointDetails.path}
					onChange={(e) => handlePathChange(e.target.value ?? "", setEndpointDetails)}
					label="path:" placeholder={`enter absolute path here. (ie.  starting with /)`} fullWidth={true}>
				</TextField>
			</Stack>
			<Stack gap={2} justifyContent={"start"} mt={2} direction={"row"} alignItems={"center"} >
				<Typography variant="subtitle1" > Add a delay :</Typography>
				<Switch value={endpointDetails.enableDelay} onChange={(e) => handleEnableDelay(e.target.checked, setEndpointDetails)} color="info" ></Switch>
				{endpointDetails.enableDelay &&
					<TextField
						type="number"
						value={endpointDetails.delayTimeout} onChange={(e) => handleDelayTimeoutChange(Number(e.target.value), endpointDetails.enableDelay, setEndpointDetails)}
						variant="standard" size="small" sx={{width: "25%"}}
						slotProps={{
							input: {
								endAdornment: (
									<InputAdornment position="end" sx={{color: "inherit"}}>
										<Typography sx={{fontSize: 'inherit', lineHeight: 'inherit'}}>ms</Typography>
									</InputAdornment>
								),
								inputProps: {
									style: {textAlign: "right"}
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
					sx={{width: 400}}
					onChange={(_, val) => {
						console.log(val?.value);
					}}
					renderInput={(params) => <TextField {...params} label="Http Status" />}
				/>
			</Stack>
		</>
	)
}
