const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = (req, res)=>{

    var mdp = req.body.password;
    var pseudo = req.body.pseudo;

    if(pseudo.length<3){
        res.status(400).json({error: "Pseudo trop court, minimum 3 caractères"})
    }else if(mdp.length<8){
        res.status(400).json({error: "Mot de passe trop court, minimum 8 caractères"})
    }else{
        bcrypt.hash(mdp, 10)
        .then(hash=>{
            
            const user = new User({
                pseudo    : req.body.pseudo,
                email     : req.body.email,
                password  : hash 
            })
            user.save()
            .then(()=>res.status(201).json({notif: "Inscription réussie avec succès ok"}))
            .catch(error=>{res.status(500).json({error})});
        })
        .catch((error)=>{res.status(200).json({error})});
    } 
}

exports.login = (req, res)=>{
    User.findOne({pseudo: req.body.pseudo})
    .then(user=>{
        if(!user){
            return res.status(501).json({error: "Utilisateur non trouvé"});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid=>{
            if(!valid){
                return res.status(500).json({error: "Mot de passe incorrect"});
            }
            res.status(200).json({
                userId:user._id,
                token: jwt.sign(
                    {userId:user._id},
                    "RANDOM_TOKEN_VALIDATE_MARVYCODE",
                    {expiresIn: "24"}
                )
            });
        })
        .catch(error=>res.status(500).json({error}))
    })
    .catch(error=>res.status(500).json(error));
}
