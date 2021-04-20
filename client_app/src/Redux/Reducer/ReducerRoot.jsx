import { combineReducers } from 'redux'
import ReducerCart from './ReducerCart'
import ReducerCount from './ReducerCount'
import ReducerSearch from './ReducerSearch'
import ReducerSession from './ReducerSession'

const ReducerRoot = combineReducers({
    Cart: ReducerCart,
    Session: ReducerSession,
    Count: ReducerCount,
    Search: ReducerSearch,
})

export default ReducerRoot