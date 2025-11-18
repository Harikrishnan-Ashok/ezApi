import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	method: "test"
}

export const endpointSlice = createSlice({
	name: "endpoint",
	initialState,
	reducers: {

	},
})

export const {} = endpointSlice.actions
export default endpointSlice.reducer
