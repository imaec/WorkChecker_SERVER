const express = require('express');
const workModel = require('./workModel');

var router = express.Router();

router.route('/work')
	.get(showWorkList)
	.post(addWork);

router.route('/work/:id')
	.get(showWorkDetail)
	.delete(deleteWork)
	.put(editWork);


module.exports = router;


function showWorkList(req, res, next) {
	workModel.getWorkList(req.query).then( result => {
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

function showWorkDetail(req, res, next) {
/*	let userId = req.params.id;
	userModel.getUserDetail(userId).then( result => {
		res.send(result);		
	}).catch( error => {
		console.log('error : ', error);
		next(error);
	});*/
}

function addWork(req, res, next) {
	workModel.addWork(req.body, (err, results) => {
		if (err) {
			console.log('err : ', err);
			return;
		}
		res.send({msg:'success'})
	});
}

function deleteWork(req, res) {
/*	let userId = req.params.id;
	userModel.deleteUser(userId).then( result => {
		res.send(result);		
	}).catch( error => {
		console.log('error : ', error);
		next(error);
	});*/
}

function editWork(req, res) {
	let workId = req.params.id;
	workModel.editWork(workId, req.body, (err, results) => {
		if (err) {
			console.log('err : ', err);
			return;
		}
		res.send({msg:'success'});
	});
}