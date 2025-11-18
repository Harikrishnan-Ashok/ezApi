import React from "react";

export interface EndpointDetailsType {
	method: string;
	path: string;
	enableDelay: boolean;
	delayTimeout: number;
	output: Record<string, any>;
}

export type EndpointDetailsSetterType = React.Dispatch<React.SetStateAction<EndpointDetailsType>>;
