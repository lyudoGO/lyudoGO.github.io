var ajaxRequester = (function ajaxRequester() {
	function request(method, headers, url, data, success, error) {
		$.ajax({
			type: method,
			headers: headers,
			url: url,
			contentType: 'application/json',
			data: JSON.stringify(data) || undefined,
			success: success,
			error: error
		});
	}

	var get = function get(headers, url, success, error) {
		return request("GET", headers, url, null, success, error);
	}

	var post = function post(headers, url, data, success, error) {
		return request("POST", headers, url, data, success, error);
	}

	var put = function put(headers, url, data, success, error) {
		return request("PUT", headers, url, data, success, error);
	}

	var del = function del(headers, url, success, error) {
		return request("DELETE", headers, url, null, success, error);
	}

	return {
		get: get,
		post: post,
		put: put,
		delete: del
	}
}());