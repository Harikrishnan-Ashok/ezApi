export type EndpointDetailsType = {
	method: string;
	path: string;
	enableDelay: boolean;
	delayTimeout: number;
	statusCode: number;
	output: Record<string, any>;
}

