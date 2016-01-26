/// <reference path="redux.d.ts" />
import { createStore, applyMiddleware, IMiddlewareStoreGeneric, IActionGeneric, IDispatch } from 'redux';

function todosReducer(state : string[] = [], action:IActionGeneric<string>) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([ action.payload ])
    default:
      return state
  }
}

//This is just a demonstration of how typing for middleware would go. It's up to you
//How to go about this if you want but this is an option for people who generally like
//Typing wherever possible 
function logger({ getState  }:IMiddlewareStoreGeneric<string[]>) {
  return (next : IDispatch) => (action : IActionGeneric<string>) => {
	  
    console.log(`The action type is ${action.type}`);
	if(action.error){
		console.error(`Something went wrong with a message '${action.error.message}'`);
	} else {
		console.log(`The payload is '${action.payload}'`);
	}
    	
    let returnValue = next(action);

    console.log('state after dispatch', getState());
    
    return returnValue
  }
}

let createStoreWithMiddleware = applyMiddleware<string[]>(logger)(createStore)
let store = createStoreWithMiddleware(todosReducer, [ 'Use Redux' ])

//suppressExcessPropertyErrors needs to be turned on
store.dispatch({
  type: 'ADD_TODO',
  text: 'Understand the middleware'
});