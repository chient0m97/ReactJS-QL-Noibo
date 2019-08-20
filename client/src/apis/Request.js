import axios from 'axios'
import cookie from 'react-cookies'
const token = cookie.load('token');
export default function Request(endpoint, method, body) {
    return axios({
        method: method,
        url: `http://fscvn.ddns.net:5000/${endpoint}`,
        data: body,
        headers: {
            "access-token": token
        }

    }).catch(err => {
        console.log(err);
    })
}