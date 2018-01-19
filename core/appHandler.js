var db = require('../models')
var bCrypt = require('bcrypt')
const exec = require('child_process').exec;
var mathjs = require('mathjs')
const Op = db.Sequelize.Op
const fs = require('fs');

const writeToLogs = function(time, type, url, request) {
	const logContent = `{"time": "${time}", "type": "${type}", "url": "${url}", "request": "${request}"}\n`;
	fs.appendFile('request_logs.txt', logContent, (err) => {
	    if (err) throw err;
	});
}






function isSqlInjection (value) {
	const SQL_GENERAL = new RegExp('w*((%27)|(\'))((%6F)|o|(%4F))((%72)|r|(%52))', 'i');
	const SQL_META = new RegExp('(%27)|(\')|(--)|(%23)|(#)', 'i');
	const SQL_META_EXTENDED = new RegExp('((%3D)|(=))[^\n]*((%27)|(\')|(--)|(%3B)|(;))', 'i');
	const SQL_UNION = new RegExp('((%27)|(\'))union', 'i');

	return SQL_GENERAL.test(value) || SQL_META.test(value) || SQL_META_EXTENDED.test(value) || SQL_UNION.test(value)
}

function isXss (value) {
	const XSS_TAG_STYLE = /<style[^>]*>[^<]*<\/style>/img;
	const XSS_TAG_SCRIPT = /<script[^>]*>[^<]*<\/script>/img;
	const XSS_ATTR = /([\w-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^ >]*))/img;
	const XSS_ATTR_SPACE_PRE = /\s*([\w-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^ >]*))/img;
	const XSS_ATTR_SPACE_SUF = /([\w-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^ >]*))(\s*)/img;
	const XSS_ATTR_WITH_TAG = /<[a-zA-Z]+[a-zA-Z0-9]*((\s+([\w-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^ >]*)))+).*>/img;
	const XSS_BLACKLIST = ["onclick", "ondblclick", "onchange", "onblur", "onfocus",
		"onkeydown", "onkeypress", "onkeyup", "onmousedown", "onmousemove",
		"onmouseover", "onmouseout", "onmouseup", "onselect", "onsubmit",
		"onreset", "onload", "onabort", "onerror"];

  return  XSS_TAG_STYLE.test(value) || XSS_TAG_SCRIPT.test(value) || XSS_ATTR.test(value) || XSS_ATTR_SPACE_PRE.test(value) ||
			  	XSS_ATTR_SPACE_SUF.test(value) || 	XSS_ATTR_WITH_TAG.test(value) || (XSS_BLACKLIST.some(function(v) { return value === v; }))
}

module.exports.userSearch = function(req, res) {
	const now = new Date();
	const request_data = req.body

	if (isSqlInjection(request_data.value)) {
	    writeToLogs(now, 'Bad Request', '/app/sql',  request_data.value);
	} else {
			writeToLogs(now, 'Good Request', '/app/sql',  request_data.value);
	}

	var query = "SELECT name,id FROM Users WHERE login='" + request_data.value + "'";

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
	const now = new Date();

	if (isXss(request_data.value)) {
	    writeToLogs(now, 'Bad Request', '/app/xss',  request_data.value);
	} else {
			writeToLogs(now, 'Good Request', '/app/xss',  request_data.value);
	}

	var output = {
		msg: 'Script Executed',
		response: {
			original_request: request_data.value
		}
	}
	res.json(output);
}

module.exports.ping = function(req, res) {
	exec('ping -c 2 ' + req.body[0].value, function(err, stdout, stderr) {
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
