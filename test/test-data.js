// global, for html page
http_request_text = require("../http-request-text.js");


module.exports = {

	"http_request_text()": function (done) {
		if (typeof window !== "undefined") throw "disable for browser";

		http_request_text('http://myip.ipip.net', 'GET', '', null,
			function (error, data) {
				console.log(error, data);
				done(error && !error.error);
			}
		);
	},
	".requestJson()": function (done) {
		if (typeof window !== "undefined") throw "disable for browser";

		http_request_text.requestJson('http://myip.ipip.net/json', 'GET', '', null,
			function (error, data) {
				console.log(error, data);
				done(error && !error.error);
			}
		);
	},
};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('mocha-test', function () {
	for (var i in module.exports) {
		it(i, module.exports[i]).timeout(15000);	//timeout 15s for web request
	}
});
