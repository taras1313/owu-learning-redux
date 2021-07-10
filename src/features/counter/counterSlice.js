import {createSlice} from "@reduxjs/toolkit";

const counterSlice = createSlice({
	name: 'counter',
	initialState: {
		value: 0,
	},
	reducers: {
		inc(state) {
			state.value++
		},
		dec(state) {
			state.value--
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload;
		},
	}
})

export const {inc, dec, incrementByAmount} = counterSlice.actions

export default counterSlice.reducer
