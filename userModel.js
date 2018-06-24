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

class UserModel {
	getUserList() {
		return db.collection('user').find({}).toArray();
	}

	getUserDetail(id) {
		return db.collection('user').findOne({_id:new ObjectID(id)})
	}

	addUser(info, callback) {
		db.collection('user').insert({
			name: info.name,
			rank: info.rank,
			department: info.department,
			email: info.email,
			password: info.password,
			profile: info.profile,
			reg_date: info.reg_date,
			tel: info.tel
		}, callback);
	}

	editUser(id, info) {
		db.collection('user').updateOne({_id:new ObjectID(id)}, {
			$set:{
				name: info.name,
				rank: info.rank,
				department: info.department,
				email: info.email,
				password: info.password,
				profile: info.profile,
				reg_date: info.reg_date,
				tel: info.tel
			}
		}, (err, results) => {
			if (err) {
				console.log('err : ', err);
				return;
			}
			return results.result.ok;
		});
	}

	deleteUser(id) {
		return db.collection('user').deleteOne({_id:new ObjectID(id)});
	}

	loginUser(info) {
		return db.collection('user').find({
			email:info.email,
			password:info.password
		}).toArray();
	}
}

module.exports = new UserModel()