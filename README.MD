#Typings-Redux

This is typings for quite possibly the best flux implementation [redux](https://github.com/rackt/redux).

This type definition has two goals in mind
- is to allow valid redux code written in javascript to work with these definitions with minimal modification
- to keep as much type information as possible when possible

Whilst the [current definitions](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/redux/redux.d.ts) solve the former goal a much
better job can be done with the latter. 

If you are moving from javascript it's a good idea to add the `suppressExcessPropertyErrors` compiler option
as actions tend to have extra fields that aren't defined. Consider refactoring or extending the IAction type as the
`suppressExcessPropertyErrors`  option catch quite a few errors.

The current type 

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