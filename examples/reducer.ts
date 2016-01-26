/// <reference path="../redux.d.ts" />
import { combineReducers, createStore } from 'redux'

function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([ action.text ])
    default:
      return state
  }
}

function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const rootReducer = combineReducers({ todos:todosReducer, counter:counterReducer});
const store = createStore(rootReducer);

store.dispatch({type:"INCREMENT"});
//Guess what counter and todos is
let {counter, todos} = store.getState();