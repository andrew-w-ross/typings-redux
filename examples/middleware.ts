/// <reference path="../redux.d.ts" />
import { createStore, applyMiddleware } from 'redux';

function todosReducer(state = [], action) {
	switch (action.type) {
		case 'ADD_TODO':
			return state.concat([action.text])
		default:
			return state
	}
}

function logger({ getState }) {
	return (next) => (action) => {
		console.log('will dispatch', action)

		// Call the next dispatch method in the middleware chain.
		let returnValue = next(action)

		console.log('state after dispatch', getState())

		// This will likely be the action itself, unless
		// a middleware further in chain changed it.
		return returnValue
	}
}

let createStoreWithMiddleware = applyMiddleware(logger)(createStore)
let store = createStoreWithMiddleware(todosReducer, ['Use Redux'])

//suppressExcessPropertyErrors needs to be turned on for this to work
store.dispatch({
	type: 'ADD_TODO',
	text: 'Understand the middleware'
});