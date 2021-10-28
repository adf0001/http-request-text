
// http-request-text @ npm
// Simply enclose node.js http.request() for responseText/responseJson

var http = require('http');

// methodOrOptions: string "POST"/"GET"/..., or user-defined options, ref. http.request().
// callback: function( error:{ error, data.* }, data:{ responseText, statusCode, statusMessage, headers, userData } )
var requestText = function (url, methodOrOptions, postData, headers, callback, userData) {
	//options
	var options = (typeof methodOrOptions === "string") ? { method: methodOrOptions } : (methodOrOptions || {});

	if (!options.headers) {
		if (headers) options.headers = headers;
		else if (options.method === "POST") options.headers =
			{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };
	}

	//cleanup
	var tmid;
	var cleanup = () => {
		if (tmid) { clearTimeout(tmid); tmid = null; };
		callback = null; 	//call only once
	}

	//request
	var req = http.request(url, options, function (res) {
		var body = "";
		res.setEncoding('utf8');

		res.on('data', function (chunk) {
			body += chunk;
		});

		res.on('end', function () {
			if (callback) {
				var resData = {
					responseText: body,
					statusCode: res.statusCode,
					statusMessage: res.statusMessage,
					headers: res.headers,
					userData: userData,
				};

				if (res.statusCode === 200) {
					callback(null, resData)
				}
				else {
					resData.error = res.statusCode + " " + res.statusMessage;
					callback(resData);
				}
				cleanup();
			}
		});

		if (options.timeout > 0) {		//use options.options.timeout ( before connected ) as waiting timeout also ( after connected )
			tmid = res.setTimeout(options.timeout, () => {
				if (callback) { callback({ error: "timeout, " + options.timeout, userData: userData }); }
				tmid = null;
				cleanup();
				res.abort();
			})
		}
	});

	req.on('error', function (err) {
		//console.log('request error: ' + err.message);
		if (callback) { callback({ error: err, userData: userData }); }
		cleanup();
	});

	if (postData) {
		//console.log("postData: "+typeof(postData)+", ["+postData+"]");
		req.write(postData);
	}

	req.end();
}

// callback: function( error:{ error, data.* }, data:{ responseJson, data.* from requestText() } )
var requestJson = function (url, methodOrOptions, postData, headers, callback, userData) {
	requestText(url, methodOrOptions, postData, headers, function (error, data) {
		if (error) { if (callback) callback(error, data); return; }

		try { data.responseJson = JSON.parse(data.responseText); }
		catch (ex) { console.log(ex); data.responseJson = null; }

		if (callback) callback(error, data);
	}, userData);
}

//module

module.exports = exports = requestText;

exports.requestText = requestText;
exports.requestJson = requestJson;
