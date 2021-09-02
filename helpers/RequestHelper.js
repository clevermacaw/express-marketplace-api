var axios = require('axios');

const timeout = 5000;

const get = async (url, headers={}, params=null) => {
    try {
        const response = await axios({
            method  : 'get',
            url     : url,
            params  : params,
            timeout : timeout,
            headers : {
                'Accept': 'application/json',
                ...headers
            }
        })

        // request success
        console.log('======= GET response :', response.data)
        return response.data;

    } catch (e) {
        // request fail
        console.error('======= error :', e.response.data)
        return {
            errors: [
                {
                    msg: e.response.data.messages || e.message
                }
            ]
        }
    }
}

const post = (res, message='', param='', code=400) => {
    return 'post';
}

module.exports = { get, post }