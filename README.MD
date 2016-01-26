#Typings-Redux

This is typings for quite possibly the best flux implementation [redux](https://github.com/rackt/redux).
These typings come in two varients, a generic and non generic version. The non generic version will
ensure that the correct 'shape' is met when calling the redux functions but the generic version will do a best attempt
at type safety. Have a look at the following generic example.

```javascript
import { createStore} from 'redux'

function todoReducer(state, action){
	switch(action.type){
		case "ADD_TODO" : return [...state, action.text]
	}
	
	return state;
}

let store = createStore(todoReducer, [ 'Use Redux' ])
``` 
The type definitions won't allow you to have the wrong shape function, 
trying to add an extra argument on todoReducer or createStore will make it fail. But changing the initial value 
to a number will work on createStore. Here is the same code but with the generic overloads.

```javascript
import { createStore, IActionGeneric} from 'redux'

function todoReducer(state: string[], action: IActionGeneric<string>) {
	switch (action.type) {
		case "ADD_TODO": return [...state, action.payload]
	}

	return state;
}

let store = createStore<string[]>(todoReducer, ['Use Redux'])
``` 
This has the same safety as the above plus the added safety of state. 
Trying to make an inital value a number in this case won't compile. Also not the usage of an IActionGeneric,
this is a interface that somewhat followes the [flux-standard-action](https://github.com/acdlite/flux-standard-action) but disagrees with the error field being a flag.
You can add your own actions interfaces or extend the IAction interface by using decleration merging on the `redux` namespace.

Lets say for example all actions in your app must have an id to help with tracking and could optionally have a description.
```javascript
//In a seperate d.ts file
/// <reference path="redux.d.ts" />
declare module redux {
	interface IAction {
		id : number;
		description?: string;
	}
}
```