import {configureStore} from "@reduxjs/toolkit";
import endpointReducer from "./slices/endpointSlice";

export const store = configureStore({
	reducer: {
		endpoint: endpointReducer
	}
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
