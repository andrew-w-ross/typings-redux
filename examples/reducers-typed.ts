/// <reference path="../redux.d.ts" />
import { combineReducers, createStore, IActionGeneric, IAction } from '../redux'

interface IState {
	todos: string[];
	counter: number;
}

function todosReducer(state: string[] = [], action: IActionGeneric<string>) {
	switch (action.type) {
		case 'ADD_TODO':
			return state.concat([action.payload])
		default:
			return state
	}
}

function counterReducer(state: number = 0, action: IAction) {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1
		default:
			return state
	}
}

const rootReducer = combineReducers<IState>({ todos: todosReducer, counter: counterReducer });
const store = createStore(rootReducer);

store.dispatch({ type: "INCREMENT" });
//You will know what counter and todos is
let {counter, todos} = store.getState();