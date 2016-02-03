/// <reference path="../redux.d.ts" />
import { createStore} from 'redux'

function todoReducer(state, action) {
	switch (action.type) {
		case "ADD_TODO": return [...state, action.text]
	}

	return state;
}

function capsTodoReducer(state, action) {
	switch (action.type) {
		case "ADD_TODO": return [...state, action.text.toUpperCase()]
	}

	return state;
}


let store = createStore(todoReducer, ['Use Redux'])

function addTodo(text) {
	return {
		type: 'ADD_TODO',
		text
	}
}

let unsubscribe = store.subscribe(s => console.log(`There are now ${s.length} todos`));


store.dispatch(addTodo('Read the docs'));
store.replaceReducer(capsTodoReducer);
store.dispatch(addTodo('Read about the middleware'));
unsubscribe();