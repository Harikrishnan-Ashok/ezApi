import {EndpointDetailsType} from "../types";

export const defaultEndpointDetails: EndpointDetailsType = {
	method: "GET",
	path: "/",
	enableDelay: false,
	delayTimeout: 0,
	statusCode:200,
	output: {}
}
