require("cloud/app.js");

var twilioAccountSid = 'ACd7db1db7fab68bd1cef56398e01d0396';
var twilioAuthToken = 'fa2598c340f8b0f49dd3d941baa6d067';
var twilioPhoneNumber = '(855)997-2773';
var secretPasswordToken = 'Something-Random-Here';

var language = "en";
var languages = ["en", "jp"];

var twilio = require('twilio')(twilioAccountSid, twilioAuthToken);

Parse.Cloud.define("sendCode", function(req, res) {
	var phoneNumber = req.params.phoneNumber;
	phoneNumber = phoneNumber.replace(/\D/g, '');

	var lang = req.params.language;
  if(lang !== undefined && languages.indexOf(lang) != -1) {
		language = lang;
	}

	if (!phoneNumber || (phoneNumber.length != 10 && phoneNumber.length != 11)) return res.error('Invalid Parameters');
	Parse.Cloud.useMasterKey();
	var query = new Parse.Query(Parse.User);
	query.equalTo('username', phoneNumber + "");
	query.first().then(function(result) {
		var min = 1000; var max = 9999;
		var num = Math.floor(Math.random() * (max - min + 1)) + min;

		if (result) {
/// REMOVE BEFORE COMMIT
			result.set("code", num);
/// REMOVE BEFORE COMMIT
			result.setPassword(secretPasswordToken + num);
			result.set("language", language);
			result.save().then(function() {
				return sendCodeSms(phoneNumber, num, language);
			}).then(function() {
				res.success();
			}, function(err) {
				res.error(err);
			});
		} else {
			var user = new Parse.User();
			user.setUsername(phoneNumber);
/// REMOVE BEFORE COMMIT
			user.set("code", num);
/// REMOVE BEFORE COMMIT
			user.setPassword(secretPasswordToken + num);
			user.set("language", language);
			user.setACL({}); 
			user.save().then(function(a) {
			}).then(function() {
				res.success();
			}, function(err) {
				res.error(err);
			});
		}
	}, function (err) {
		res.error(err);
	});
});

Parse.Cloud.define("logIn", function(req, res) {
	Parse.Cloud.useMasterKey();

	var phoneNumber = req.params.phoneNumber;
	phoneNumber = phoneNumber.replace(/\D/g, '');

	if (phoneNumber && req.params.codeEntry) {
		Parse.User.logIn(phoneNumber, secretPasswordToken + req.params.codeEntry).then(function (user) {
			res.success(user._sessionToken);
		}, function (err) {
			res.error(err);
		});
	} else {
		res.error('Invalid parameters.');
	}
});

function sendCodeSms(phoneNumber, code, language) {
	var prefix = "+1";
	if(typeof language !== undefined && language == "jp") {
		prefix = "+81";
	}
	console.log(prefix);

	var promise = new Parse.Promise();
	twilio.sendSms({
		to: prefix + phoneNumber.replace(/\D/g, ''),
		from: twilioPhoneNumber.replace(/\D/g, ''),
		body: 'Your login code for AnyPhone is ' + code
	}, function(err, responseData) {
		if (err) {
			console.log(err);
			promise.reject(err.message);
		} else {
			promise.resolve();
		}
	});
	return promise;
}