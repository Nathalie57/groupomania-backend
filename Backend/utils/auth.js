const jwt = require('jsonwebtoken');

exports.decode = (authorization) => {
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    return {
        id: decodedToken.id,
        role: decodedToken.is_admin,
    };
};