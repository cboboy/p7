const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const DB = require('../db.config');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({ message: 'Bad email or password'});
    }

    try{
        let user = await DB.User.findOne({ where: {email: email}, raw: true})
        if(user === null){
            return res.status(401).json({ message: 'This account does not exists'});
        }

        // Vérification du mot de passe
        let test = await bcrypt.compare(password, user.password)
        if(!test){
            return res.status(401).json({ message: 'Wrong password'});
        };

        // Génération du token
        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_DURING });
        return res.json({ access_token: token});
    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err});
        }
        res.status(500).json({ message: 'Login process failed', error: err});   
    }
};