import { combineReducers } from 'redux'

import  todoUser  from '@reducers/user.reducer'
import  todoCommon  from '@reducers/common.reducer'

const rootReducer = combineReducers({
    todoUser,
    todoCommon
  })
  
  export default rootReducer