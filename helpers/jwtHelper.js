const JWT = require('jsonwebtoken');

const jwtSettings = require('../constants/jwtSetting');
    
const encodeToken = (userId, email, firstName, lastName) => {
    return JWT.sign({
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1 ),
    audience: jwtSettings.AUDIENCE,
    issuer: jwtSettings.ISSUER,
    _id: userId, // THường dùng để ktr jwt lân sau
    email: email,
    fullname: firstName + '-' + lastName,
    // fullName: ` ${firstName} - ${lastName} `,
    algorithm: 'HS512', // default có thể không có 
}, jwtSettings.SECRET)
}

module.exports = encodeToken;