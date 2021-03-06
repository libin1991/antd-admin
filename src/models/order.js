import { getOrder } from '../services/api'
import { List } from 'immutable'

export default {
  namespace: 'order',
  state: {
    list: List(),
    loading: false
  },
  effects: {
    *getData({payload}, {call, put}){
      yield put({
        type: 'changeLoading',
        payload:true
      })
      const res = yield call(getOrder, payload)
      yield put({
        type: 'saveData',
        payload: List(res)
      })
      yield put({
        type: 'changeLoading',
        payload:false
      })
    }
  },
  reducers: {
    saveData(state, {payload}){
      return {
        ...state,
        list: payload
      }
    },
    changeLoading(state, {payload}){
      return {
        ...state,
        loading: payload
      }
    }
  }  
}