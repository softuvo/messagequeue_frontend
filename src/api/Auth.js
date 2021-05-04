import { API_END_POINTS, apiBaseUrl } from './apiActions/apiAction';
import { apiPostMethod } from './apiActions/api';

const { LOGIN, SIGNUP } = API_END_POINTS;


export const login = (data, header) => {
    return new Promise((resolve, reject) => {
        let url = `${apiBaseUrl}${LOGIN}`;
        apiPostMethod(url, data, header).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}


//Sign up API
export const signupAPI = (data, header) => {
    return new Promise((resolve, reject) => {
        let url = `${apiBaseUrl}${SIGNUP}`;
        apiPostMethod(url, data, header).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
