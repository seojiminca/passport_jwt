
module.exports = function errorHandler(err, req, res, next) {
    // custom application error
    if(typeof (err) === 'string'){
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid Token' });
    }

    return res.status(500).json({ message: err.message });
}
