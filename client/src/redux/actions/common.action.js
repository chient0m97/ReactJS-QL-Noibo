import { FETCH_LOADING } from '@constants'


export const fetchLoading = (data) => {
    console.log('ddaayy laf  action', data)
    return {
        type: FETCH_LOADING,
        payload: data
    }
}