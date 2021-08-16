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

module.exports = { modelError }