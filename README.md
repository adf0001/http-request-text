# http-request-text
Simply enclose node.js http.request() for responseText/responseJson.

# Install
```
npm install http-request-text
```

# Usage & Api
```javascript
var http_request_text= require("http-request-text");

/*
requestText = function (url, methodOrOptions, postData, headers, callback, userData)		//default
	methodOrOptions: string "POST"/"GET"/..., or user-defined options, ref. http.request().
	callback: function( Error:{ data.* }, data:{ responseText, statusCode, statusMessage, headers, userData } )
*/
http_request_text('http://url', 'GET', '', null,
    function (error, data) {
        console.log(error, data);
    }
);

/*
requestJson = function (url, methodOrOptions, postData, headers, callback, userData)
	callback: function( Error:{ data.* }, data:{ responseJson, data.* from requestText() } )
*/
http_request_text.requestJson('http://url/json', 'GET', '', null,
    function (error, data) {
        console.log(error, data);
    }
);

//	callback: function( error, data:responseText )
browser_http_request.text('http://url', 'GET', '', null,		//wrap just text as data
	function (error, data) {
		console.log(error, data);
	}
);

//	callback: function( error, data:responseJson )
browser_http_request.json('http://url/json', 'GET', '', null,		//wrap just json as data
	function (error, data) {
		console.log(error, data);
	}
);

```
