import { legacy_createStore as createStore} from 'redux'
import { defaultReducer } from './reducer/reducer'

export const getStore = (state) => {
    return createStore(defaultReducer, state)
}