import {Autocomplete, IconButton, InputAdornment, Stack, Switch, TextField, Tooltip, Typography} from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {delayHint, httpStatus, methods} from "../utils/basicSettingsUtils";
import {EndpointDetailsType} from "../utils/endpointUtils";
import React from "react";

type props = {
	endpointDetails: EndpointDetailsType,
	setEndpointDetails: React.Dispatch<React.SetStateAction<EndpointDetailsType>>
}

export default function BasicSettingSection({endpointDetails, setEndpointDetails}: props) {

	return (
		<>
			<Stack gap={1} mt={2} alignItems={"start"} direction={"row"} >
				<Autocomplete
					disablePortal
					options={methods}
					sx={{width: 300}}
					renderInput={(params) => <TextField {...params} label="Method" />}
				/>
				<TextField label="path:" placeholder={`enter absolute path here. (ie.  starting with /)`} fullWidth={true}></TextField>
			</Stack>
			<Stack gap={2} justifyContent={"start"} mt={2} direction={"row"} alignItems={"center"} >
				<Typography variant="subtitle1" > Add a delay :</Typography>
				<Switch color="info" ></Switch>
				<TextField variant="standard" size="small" sx={{width: "25%"}}
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
