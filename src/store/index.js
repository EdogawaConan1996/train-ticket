import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import homeReducer from './modules/home/reducer'
import queryReducer from './modules/query/reducer'
import thunkMiddleware from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware),
);

const reducers = combineReducers({
  home: homeReducer,
  query: queryReducer
})

const store = createStore(reducers, enhancer)

export default store;
