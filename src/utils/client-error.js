const AppError = require('./error-handler');
const { StatusCodes } = require('http-status-codes');

class ClientError extends AppError {
    constructor(name, messege, explanation, statusCode) {
        super(
            name,
            messege,
            explanation,
            statusCode
        );
    }
}

module.exports = ClientError;