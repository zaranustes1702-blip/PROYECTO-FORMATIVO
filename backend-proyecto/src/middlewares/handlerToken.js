const jwt = require ("jsonwebtoken")
require ("dotenv").config();
const response = require("../functions/response");

function ValidateToken(req, res, next) {
//     const headers= req.headers['authorization'];
//     const token= headers && headers.split(' ')[1];
//     console.log("Token recibido: ", token);
// if (!token || token === "null" || token === "undefined"){
//     let responseData = new response(false, "Token no proporcionado", null);
//     return res.status(403).json(responseData.json);
// }
//     jwt.verify(token, process.env.JWT_KEY_SECRET, (err, user) => {
//         if(err) {
//             return res.status(403).json({message: "Token no válido"});
//         }
//         req.user= user;
//         next();
//     });
next();
}
module.exports = ValidateToken;