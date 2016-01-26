declare module redux {
	//This should be extended
	export interface IAction {
		type: string | number | Symbol;
	}

	export interface IActionGeneric<TPayload> extends IAction {
		payload?: TPayload;
		error?: Error;
		meta?:any;
	}

	export interface IActionCreator {
		(...args: any[]): IAction
	}

	export interface IReducer {
		(state: any, action: IAction): any;
	}

	export interface IReducerMap {
		[key: string]: IReducerMap | IReducer
	}

	export interface IReducerGeneric<TState> extends IReducer {
		(state: TState, action: IAction): TState;
	}

	export interface IDispatch {
		(action: IAction): IAction;
	}

	export interface IMiddlewareStore {
		getState(): any;

		dispatch: IDispatch;
	}

	export interface IMiddlewareStoreGeneric<TState> extends IMiddlewareStore {
		getState(): TState;
	}

	export interface IStore extends IMiddlewareStore {
		subscribe(listener: (state: any) => any) : () => void;

		replaceReducer(nextReducer: IReducer): void;
	}

	export interface IStoreGeneric<TState> extends IMiddlewareStoreGeneric<TState> {
		subscribe(listener: (state: TState) => any) : () => void;

		replaceReducer(nextReducer: IReducerGeneric<TState>): void;
	}

	export interface IMiddleWare {
		(middlewareStore: IMiddlewareStore): (next: IDispatch) => IDispatch;
	}

	export interface IMiddleWareGeneric<State> extends IMiddleWare {
		(middlewareStore: IMiddlewareStoreGeneric<State>): (next: IDispatch) => IDispatch;
	}

	export interface ICreateStore {
		(reducer: IReducer, initialState?: any): IStore;
	}

	export interface ICreateStoreGeneric<TState> extends ICreateStore {
		(reducer: IReducerGeneric<TState>, initialState?: TState): IStoreGeneric<TState>;
	}

	export interface IStoreEnhancer {
		(createStore: ICreateStore): ICreateStore;
	}

	export interface IStoreEnhancerGeneric<TState> extends IStoreEnhancer {
		(createStore: ICreateStoreGeneric<TState>): ICreateStoreGeneric<TState>;
	}

	export function createStore<TState>(reducer: IReducerGeneric<TState>, initialState?: TState): IStoreGeneric<TState>;
	export function createStore(reducer: IReducer, initialState?: any): IStore;	
	
	export function combineReducers(reducers: IReducerMap): IReducer;
	export function combineReducers<TState>(reducers: IReducerMap): IReducerGeneric<TState>;
	
	export function applyMiddleware(...middlewares: IMiddleWare[]): IStoreEnhancer;
	export function applyMiddleware<TState>(...middlewares: IMiddleWareGeneric<TState>[]): IStoreEnhancerGeneric<TState>;	

	export function bindActionCreators<TActionCreator extends IActionCreator | { [key: string]: IActionCreator }>(actionCreators: TActionCreator, dispatch: IDispatch): TActionCreator;

	export function compose<TArg>(...functions: { (arg: TArg): TArg }[]): (arg: TArg) => TArg;
	export function compose(...functions: { (arg: any): any }[]): (arg: any) => any;	
}

declare module "redux" {
	export = redux;
}