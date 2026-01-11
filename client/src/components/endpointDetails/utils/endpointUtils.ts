import { EndpointDetailsType } from "../types";

export const defaultEndpointDetails: EndpointDetailsType = {
	method: "GET",
	path: "/",
	enableDelay: false,
	delayTimeout: 0,
	statusCode: 200,
	output: {}
}

//when xstates done remove ts
export function callXstateFn(type: string, newEndpointDetails: EndpointDetailsType) {
	switch (type) {
		case "SAVE_ENDPOINT":
			console.log("calling x state fn for saving")
			console.log(newEndpointDetails)
			break;
	}
} 
