const modelError = (error) => {
    var _errors = [];
    error.errors.every((item, index) => {
        // build messages like validator error
        _errors.push({
            value: item.value,
            msg: item.message,
            param: item.path
        });
    });

    return {
        errors: _errors
    };
}

const successResponse = (res, message=null, data=null) => {
    var response = {
        status: 'success'
    }
    if (message) {
        response.message = message;
    }
    if (data) {
        response.data = data;
    }

    return res.json(response);
}

const failResponse = (res, message='', param='', code=400) => {
    var message = {
        msg: message
    }
    if (param) {
        message.param = param;
    }

    return res.status(code).json({
        errors: [message]
    });
}

module.exports = { modelError, successResponse, failResponse }