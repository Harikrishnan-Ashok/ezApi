import { createMachine } from 'xstate';
import { defaultEndpointDetails } from './types';

export const endpointDetailsMachine = createMachine({
	id: 'endpointDetailsMachine',
	initial: 'IDLE',
	context: {
		data: defaultEndpointDetails,
	},
	states: {
		IDLE: {
			on: { PRIMARY: "EDITING" }
		},
		EDITING: {
			on: {
				PRIMARY: {
					actions: () => { console.log("trying to save") }
				},
				CANCEL: "IDLE"
			}
		},
		VALIDATING: {},
		CONFIRMATION: {
			on: {
				SAVE: "INVOKE_SAVE",
				CANCEL: "EDITING",
			}
		},
		INVOKE_SAVE: {},

	}
});
