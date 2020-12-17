const bcrypt = require('bcrypt');
const User = require('../models/User');

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
            //res.status(200).json({hash});
        })
        .catch((error)=>{res.status(200).json({error})});
    } 
}

exports.login = (req, res)=>{
    
}
