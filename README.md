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
requestText = function (url, methodOrOptions, postData, headers, callback, lastKey)		//default
	methodOrOptions: string "POST"/"GET"/..., or user-defined options, ref. http.request().
	callback: function( error:{ error, data.* }, data:{ responseText, statusCode, statusMessage, headers, lastKey } )
*/
http_request_text('http://url', 'GET', '', null,
    function (error, data) {
        console.log(error, data);
    }
);

/*
requestJson = function (url, methodOrOptions, postData, headers, callback, lastKey)
	callback: function( error:{ error, data.* }, data:{ responseJson, data.* from requestText() } )
*/
http_request_text.requestJson('http://url/json', 'GET', '', null,
    function (error, data) {
        console.log(error, data);
    }
);

```

