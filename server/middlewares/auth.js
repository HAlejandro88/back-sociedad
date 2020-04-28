const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(500).json({
                err
            })
        }

        req.user =decoded
        next();
    })
}


function verificarAdmin(req,res, next) {
    let token =  req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(500).json({
                err
            })
        }

        if (decoded.user.role === 'ADMIN_ROLE') {
            next();
        } else {
            return res.json({
                errors: {message: 'el usuario no es administrador'}
            })
        }
    })
}


module.exports = {verificarToken, verificarAdmin};