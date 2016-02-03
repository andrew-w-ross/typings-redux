/// <reference path="../redux.d.ts" />
import { createStore, IActionGeneric} from 'redux'

function todoReducer(state: string[], action: IActionGeneric<string>) {
	switch (action.type) {
		case "ADD_TODO": return [...state, action.payload]
	}

	return state;
}

function capsTodoReducer(state: string[], action: IActionGeneric<string>) {
	switch (action.type) {
		case "ADD_TODO": return [...state, action.payload.toUpperCase()]
	}

	return state;
}

let store = createStore(todoReducer, ['Use Redux'])

function addTodo(text): IActionGeneric<string> {
	return {
		type: 'ADD_TODO',
		payload: text
	}
}

let unsubscribe = store.subscribe(s => console.log(`There are now ${s.length} todos`));

store.dispatch(addTodo('Read the docs'));
store.replaceReducer(capsTodoReducer);
store.dispatch(addTodo('Read about the middleware'));
unsubscribe();