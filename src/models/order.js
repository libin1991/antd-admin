import { getOrder } from '../services/api'

export default {
  namespace: 'order',
  state: {
    list: [],
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
        payload: res
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