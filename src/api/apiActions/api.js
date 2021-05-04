import axios from 'axios';

export const apiDeleteMethod = (url, headers) => {
    return new Promise((resolve, reject) => {
        axios.delete(url, { headers }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.response)
        })
    })
}

export const apiMultiDeleteMethod = (url,headers,data) => {
    return new Promise((resolve, reject) => {
        axios.delete(url,{ headers,data }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.response)
        })
    })
}

export const apiGetMethod = (url, headers) => {
    return new Promise((resolve, reject) => {
        axios.get(url, { headers }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.response)
        })
    })
}
export const apiPatchMethod = (url, data, headers) => {
    return new Promise((resolve, reject) => {
        axios.patch(url, data, { headers }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.response)
        })
    })
}

export const apiPostMethod = (url, data, headers) => {
    return new Promise((resolve, reject) => {
        axios.post(url, data, { headers }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.response)
        })
    })
}
