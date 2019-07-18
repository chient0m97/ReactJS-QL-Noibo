import { FETCH_LOADING } from '@constants'


export const fetchLoading = (data) => {
    console.log('day la  action', data)
    return {
        type: FETCH_LOADING,
        payload: data
    }
}