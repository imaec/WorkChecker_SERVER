const express = require('express');
const multer = require('multer');
const pathUtil = require('path');

var storage = multer.diskStorage({
	destination: './uploads/',
	filename: function (req, file, cb) {
		const fileName = req.body['email'].split('@')[0];
		cb(null, fileName + pathUtil.extname(file.originalname));
	}
});
const upload = multer({
    storage: storage
});

const userModel = require('./userModel');

var router = express.Router();

router.route('/user')
	.get(showUserList)
	.post(upload.single('image'), addUser);
	
router.route('/user/login')
	.get(loginUser);

router.route('/user/:id')
	.get(showUserDetail)
	.delete(deleteUser)
	.put(upload.single('image'), editUser);

router.route('/user/profile/:image')
	.get(showUserProfile);

module.exports = router;



function showUserList(req, res, next) {
	userModel.getUserList().then( result => {	
		res.send({msg:'success', result});
	}).catch( error => {
		console.log('error : ', error);
		next(error);
	});
}

function showUserDetail(req, res, next) {
	let userId = req.params.id;
	userModel.getUserDetail(userId).then( result => {
		res.send(result);		
	}).catch( error => {
		console.log('error : ', error);
		next(error);
	});
}

function addUser(req, res, next) {
	const image = req.file;
	if (!image) {
        res.status(400).send({msg:'no image'});
        return;
    }

    const ext = pathUtil.extname(image.originalname);
    image.ext = ext;

	req.body.profile = 'http://52.79.144.254:3000/user/profile/' + image.filename;

	userModel.addUser(req.body, (err, results) => {
		if (err) {
			console.log('err : ', err);
			return;
		}
		// res.send({msg:'success', result:results.ops[0]});
		res.send({msg:'success'})
	});
}

function deleteUser(req, res) {
	let userId = req.params.id;
	userModel.deleteUser(userId).then( result => {
		res.send(result);
	}).catch( error => {
		console.log('error : ', error);
		next(error);
	});
}

function editUser(req, res) {
	const image = req.file;
	if (!image) {
        res.status(400).send({msg:'no image'});
        return;
    }

    const ext = pathUtil.extname(image.originalname);
    image.ext = ext;

	let userId = req.params.id;
	req.body.profile = 'http://52.79.144.254:3000/user/profile/' + image.filename;

	userModel.editUser(userId, req.body).then( results => {
	    res.send({msg:'success', result:req.body});
	}).catch( error => {
		console.log('error : ', error);
		next(error);
	});
}

function loginUser(req, res, next) {
	userModel.loginUser(req.query).then( result => {
		var msg = 'fail';
		if (result.length > 0) {
			msg = 'success'
		}
		res.send({msg: msg, result});
	}).catch( error => {
		console.log('error : ', error);
		next(error);
	});
}

function showUserProfile(req, res) {
	res.sendFile(__dirname + '/uploads/' + req.params.image);
}