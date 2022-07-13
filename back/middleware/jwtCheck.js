const jwt = require('jsonwebtoken');

/**
 * extraction du token
 */
const extractBearer = authorization => {
    if(typeof authorization !== 'string'){
        return false;
    }

    // on isole le token
    const matches = authorization.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

const checkTokenMdw = (req, res, next) => {
    const token = req.headers.authorization && extractBearer(req.headers.authorization);

    if(!token){
        return res.status(401).json({ message: 'On te surveille !' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if(err){
            return res.status(401).json({ message: 'Bad token ' });
        }

        next()
    })
};

module.exports = checkTokenMdw;