export type EndpointDetailsType = {
	method: string;
	path: string;
	enableDelay: boolean;
	delayTimeout: number;
	statusCode: number;
	output: string;
}



//default values
export const defaultEndpointDetails: EndpointDetailsType = {
	method: "GET",
	path: "/",
	enableDelay: false,
	delayTimeout: 0,
	statusCode: 200,
	output: "{}"
}
