import { API_END_POINTS, apiBaseUrl } from './apiActions/apiAction';
import { apiPostMethod } from './apiActions/api';
const {GET_USERS_POST,SEND_USER_MESSAGE,FETCH_RANDOM_MESSAGE} = API_END_POINTS;


export const getUserPost = (data, header) => {
    return new Promise((resolve, reject) => {
        let url = `${apiBaseUrl}${GET_USERS_POST}`;
        apiPostMethod(url, data, header).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const sendUserPost = (data, header) => {
    return new Promise((resolve, reject) => {
        let url = `${apiBaseUrl}${SEND_USER_MESSAGE}`;
        apiPostMethod(url, data, header).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const fetchRandomMessage = (data, header) => {
    return new Promise((resolve, reject) => {
        let url = `${apiBaseUrl}${FETCH_RANDOM_MESSAGE}`;
        apiPostMethod(url, data, header).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}