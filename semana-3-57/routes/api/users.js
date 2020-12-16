const router = require('express').Router();
const User = require('../../models');
const userController = require('../../controllers/UserController.js');
const bcrypt = require('bcryptjs');

router.get('/', async(req,res)=>{
	const user= await User.user.findAll();
	res.status(200).json(user);
});
router.post('/register', async(req,res)=>{
	req.body.password =await bcrypt.hashSync(req.body.password,10);
	const user = await User.create(req,body);
	res.status(200).json(user);
});
router.post('/auth',userController.signin);

module.exports = router;