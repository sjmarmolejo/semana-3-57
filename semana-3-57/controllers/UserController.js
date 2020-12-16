/* const User= require('../models'); */
const config =require('../secret/config.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');
/* const { ne } = require('sequelize/types/lib/operators'); */
exports.signin = async(req, res,next)=>{
    try{
	const user = await models.user.findOne({where:{email:req.body.email}});
	if(user){
		const passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
		if(passwordIsValid){
			const token = jwt.sign({
				id: user.id,
				name:user.name,
			},
			'config.secret',
			{
				expiresIn:86400,
			});
			res.status(200).send({
                accessToken: token
            });
        }
        else{
            res.status(401).send({
                auth: false,
                accessToken: null,
                reason: 'Invalid Password!'
            });
        }
    }
        else{
            res.status(404).send(
                'User Not Found.');
        }
    }
    catch(error){
        res.status(500).send({
            error: 'Error ->'
        })
        next(error);
    }
};
