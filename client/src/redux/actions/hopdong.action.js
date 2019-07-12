import { FETCH_HOPDONG } from '@constants'

export const fetchHopdong = (data) => {
    return {
        type: FETCH_HOPDONG,
        payload: data
    }
}