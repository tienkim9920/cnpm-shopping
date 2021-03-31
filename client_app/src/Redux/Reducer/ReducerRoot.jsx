import { combineReducers } from 'redux'
import ReducerCart from './ReducerCart'
import ReducerCount from './ReducerCount'
import ReducerSession from './ReducerSession'

const ReducerRoot = combineReducers({
    Cart: ReducerCart,
    Session: ReducerSession,
    Count: ReducerCount
})

export default ReducerRoot