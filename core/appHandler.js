var db = require('../models')
const Op = db.Sequelize.Op
const fs = require('fs');

const writeToLogs = function(time, type, url, request) {
	const LOG_CONTENT = `{"time": "${time}", "type": "${type}", "url": "${url}", "request": "${request}"}\n`;
	fs.appendFile('request_logs.txt', LOG_CONTENT, (err) => {
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

function isLfi(value) {
	const LFI_BLACKLIST = [
		"<?php passthru($_GET['cmd']); ?>",
		"php://filter/converparsed_data.base64-encode/resource=",
		"%00",
		"../../../../../etc/issue",
		"../../../../../etc/mot",
		"../../../../../etc/passwd",
		"../../../../../etc/group",
		"../../../../../etc/resolv.con",
		"../../../../../etc/shado",
		"/etc/httpd/logs/acces_log",
		"/etc/httpd/logs/error_log",
		"/var/www/logs/access_log",
		"/var/www/logs/access.log",
		"/usr/local/apache/logs/access_ log",
		"/usr/local/apache/logs/access. log",
		"/var/log/apache/access_log",
		"/var/log/apache2/access_log",
		"/var/log/apache/access.log",
		"/var/log/apache2/access.log",
		"/var/log/access_log"
	];

	return (LFI_BLACKLIST.some(function(v) { return value === v; }));
}

module.exports.sql = function(req, res) {
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

module.exports.lfi = function(req, res) {
	const request_data = req.body;
	const now = new Date();
	if (isLfi(request_data.value)) {
	    writeToLogs(now, 'Bad Request', '/app/lfi',  request_data.value);
	} else {
			writeToLogs(now, 'Good Request', '/app/lfi',  request_data.value);
	}
	var output = {
		msg: 'Script Executed',
		response: {
			original_request: request_data.value
		}
	}
	res.json(output);
}

module.exports.user = function(req, res) {
	const request_data = req.body;
	const now = new Date();

	var parsed_data = JSON.parse(request_data.value);

	if(isXss(parsed_data.picture) || isXss(parsed_data.age) || isXss(parsed_data.name) || isXss(parsed_data.gender) || isXss(parsed_data.company) || isXss(parsed_data.email) || isXss(parsed_data.phone) || isXss(parsed_data.address) || isXss(parsed_data.about) || isXss(parsed_data.registered)){
		writeToLogs(now, 'Bad Request', '/app/user',  request_data.value);
	} else {
			writeToLogs(now, 'Good Request', '/app/user',  request_data.value);
	}

	var output = {
		msg: 'Script Executed',
		response: {
			original_request: request_data.value
		}
	}
	res.json(output);
}
