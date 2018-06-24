var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/work_checker';
var ObjectID = require('mongodb').ObjectID;

var db;

MongoClient.connect(url, function (err, database) {
	if (err) {
		console.error('MongoDB connect failed.', err);
		return;
	}
	db = database.db('work_checker');
});

class WorkModel {
	getWorkList(info) {
		if (info.date) {
			if (info.user_id) {
				return db.collection('work').find({user_id:info.user_id, date:info.date}).toArray()
			} else {
				return db.collection('work').find({date:info.date}).toArray()
			}
		} else {
			return db.collection('work').find({user_id:info.user_id}).toArray()
		}
	}

	getWorkDetail(id) {
		return db.collection('work').findOne({_id:new ObjectID(id)})
	}

	addWork(info, callback) {
		db.collection('work').insert({
			user_id: info.user_id,
			status: info.status,
			date: info.date,
			time_a: info.time_a,
			time_b: info.time_b
		}, callback);
	}

	editWork(id, info, callback) {
		db.collection('work').updateOne({_id:new ObjectID(id)}, {
			$set:{
				time_b: info.time_b
			}
		}, callback);
	}

	deleteWork(id) {
		return db.collection('work').deleteOne({_id:new ObjectID(id)});
	}
}

module.exports = new WorkModel()