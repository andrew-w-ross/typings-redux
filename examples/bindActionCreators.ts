/// <reference path="../redux.d.ts" />
import { createStore, bindActionCreators, combineReducers } from '../redux';

function todoReducer(state = [], action) {
	switch (action.type) {
		case 'ADD_TODO': return state.concat([action.text]);
	}

	return state;
}

function counterReducer(state = 0, action) {
	switch (action.type) {
		case "INCREMENT": return state + 1;
		case "DECREMENT": return state - 1;
	}

	return state;
}

function addTodo(text) {
	return {
		type: "ADD_TODO",
		text
	};
}

function increment() {
	return {
		type: "INCREMENT"
	};
}

function decrement() {
	return {
		type: "DECREMENT"
	};
}

const rootReducer = combineReducers({ counter: counterReducer, todos: todoReducer })
const store = createStore(rootReducer);

let boundActions = bindActionCreators({ addTodo, increment }, store.dispatch);
let boundDecrement = bindActionCreators(decrement, store.dispatch);

//Bound actions will still keep there type information
boundActions.addTodo("asdf");
boundActions.increment();
boundDecrement();