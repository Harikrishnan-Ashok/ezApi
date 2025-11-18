export interface EndpointDetailsType {
	method: string;
	path: string;
	enableDelay: boolean;
	delayTimeout: number;
	output: Record<string, any>;
}

export const defaultEndpointDetails: EndpointDetailsType = {
	method: "GET",
	path: "/",
	enableDelay: false,
	delayTimeout: 0,
	output: {}
}
