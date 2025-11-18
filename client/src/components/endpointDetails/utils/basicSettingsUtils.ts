import {EndpointDetailsSetterType} from "../types";

export const delayHint = "Adding a delay with a reasonable timeout helps mimic the loading phase you’d see in a normal API call"
export const methods = ["GET", "POST", "DELETE", "PUT"]
export const httpStatus = [
	{label: "200: OK", value: 200},
	{label: "201: Created", value: 201},
	{label: "204: No Content", value: 204},
	{label: "400: Bad Request", value: 400},
	{label: "401: Unauthorized", value: 401},
	{label: "403: Forbidden", value: 403},
	{label: "404: Not Found", value: 404},
	{label: "409: Conflict", value: 409},
	{label: "422: Unprocessable Entity", value: 422},
	{label: "500: Internal Server Error", value: 500},
	{label: "502: Bad Gateway", value: 502},
	{label: "503: Service Unavailable", value: 503}
];

export const handleMethodChange = (val: string, setVal: EndpointDetailsSetterType) => {
	setVal(prev => ({...prev, method: val}));
	console.log("changin the method")
}

export const handlePathChange = (val: string, setVal: EndpointDetailsSetterType) => {
	setVal(prev => ({...prev, path: val}));
	console.log("changin the path")
}

export const handleEnableDelay = (checked: boolean, setVal: EndpointDetailsSetterType) => {
	setVal(prev => ({...prev, enableDelay: checked}));
	console.log(checked ? "Enabling Delay" : "Disabling Delay");
};

export const handleDelayTimeoutChange = (timeout: number, delayNeeded: boolean, setVal: EndpointDetailsSetterType) => {
	if (delayNeeded === true) {
		setVal(prev => ({...prev, delayTimeout: timeout}));
		console.log("Delay timeout ", timeout);
	}
};
