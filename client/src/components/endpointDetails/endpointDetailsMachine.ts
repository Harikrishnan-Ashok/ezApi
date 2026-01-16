import { assign, createMachine } from 'xstate';
import { defaultEndpointDetails } from './types';

export const endpointDetailsMachine = createMachine({
	id: 'endpointDetailsMachine',
	initial: 'IDLE',
	context: {
		data: defaultEndpointDetails,
		message: "",
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
				UPDATE_FIELD: {
					actions: "updateFieldAction"
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
}, {
	actions: {
		updateFieldAction: assign({
			data: (ctx) => {
				console.log(ctx.event)
				return { ...ctx.context.data, [ctx.event.key]: ctx.event.value }
			}
		})
	}
}
);
