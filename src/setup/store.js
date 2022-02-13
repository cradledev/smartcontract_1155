// Imports
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

// App Imports
import * as students from '../components/students/api/state'

// Root Reducer
const rootReducer = combineReducers({
  ...students
})

// Store
export const store = createStore(rootReducer, applyMiddleware(thunk))