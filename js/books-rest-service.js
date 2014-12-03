(function ($) {
	var PARSE_APP_ID = "9MZHdXjQzfYODa66oLKP7h8gLvSrS5SmOGuIHKRN";
	var PARSE_REST_API_KEY = "XHJfTH37hNF5oA1hsn2nrRSMEOcmJLyNGbcqxLPF";
	var url = "https://api.parse.com/1/classes/Book/";
	var headers = {
		"X-Parse-Application-Id": PARSE_APP_ID,
		"X-Parse-REST-API-Key": PARSE_REST_API_KEY 
	};

	function loadBooksFromBase() {
		ajaxRequester.get(
			headers, 
			url, 
			function(data) {
				for (var item in data.results) {
					var book = drawUI.loadedBooks(data.results[item]);
					$("#books > ul").append(book);
				}
			}, 
			function() {
				drawUI.errorMessage("Cannto load books from server.");
			}
		);
	}

	function deleteBookFromBase(parent) {
		var id = parent.data("book").objectId;
		var title = parent.data("book").title;
		ajaxRequester.delete(
			headers, 
			(url + id),
			function() {
				parent.remove();
				drawUI.successMessage('Title "' + title + '" successfully removed from data base.');
			},
			function() {
				drawUI.errorMessage("Cannot delete " + title + " on server.");
			}
		);
	}

	function postBooksToBase() {
		$("#create-books>ul li:not(:first)").each(function(){
			if ($(this).first().find(".title").val() == "") {
				drawUI.errorMessage("Cannot post empty book's title to server");
				return;
			};
			var obj = {};
			var tagsText = $(this).find(".tags").val();
			var tagsArr = tagsText.split(",") || [];
			for (var i = 0; i < tagsArr.length; i++) {
				tagsArr[i] = tagsArr[i].trim();
			};
			obj["title"] = $(this).find(".title").val();
			obj["author"] = $(this).find(".author").val();
			obj["isbn"] = $(this).find(".isbn").val();
			obj["tags"] = tagsArr;

			ajaxRequester.post(
				headers, 
				url,
				obj,
				function() {
					drawUI.successMessage('Title "' + obj["title"] + '"" successfully added to server base.');
				},
				function() {
					drawUI.errorMessage('Cannot add "' + obj["title"] + '" to server base.');
				}
			);
		});
	}

	function putBooksToBase() {
		$("#edit-books>ul li:not(:first)").each(function(){
			if ($(this).first().find(".title").val() == "" || $(this).data("book") == undefined) {
				drawUI.errorMessage("Cannot put empty book's title to server base");
				return;
			};
			var obj = {};
			var id = $(this).data("book").objectId;
			obj["title"] = $(this).find(".title").val();
			obj["author"] = $(this).find(".author").val();
			obj["isbn"] = $(this).find(".isbn").val();
			ajaxRequester.put(
				headers, 
				(url + id),
				obj,
				function() {
					drawUI.successMessage('Title "' + obj["title"] + '"" successfully added to server base.');
				},
				function() {
					drawUI.errorMessage('Cannot edit "' + obj["title"] + '" to server base.');
				}
			);
		});
	}

	$(document).ready(function () {
		$("#get-books").on("click", function() {
			$("#books > ul li:not(:first)").remove();
			loadBooksFromBase(); 
		});
		$("#create-book").on("click", function() {
			var newBook = drawUI.createdBooks();
			$("#create-books>ul").append(newBook);
			$("#create-books").show();
		});
		$("#add-new-book").on("click", function() {
			postBooksToBase();
			$("#create-books>ul li:not(:first)").remove();
			$("#create-books").hide();
		});
		$("#remove-new-book").on("click", function() {
			if ($("#create-books>ul li").length === 1) {
				$("#create-books").hide();
			} else {
				$("#create-books>ul li:last").remove();
			};
		});
		$("#edit-book").on("click", function() {
			putBooksToBase();
			$("#edit-books>ul li:not(:first)").remove();
			$("#edit-books").hide();
			$("#tags").hide();
		});
		$("#books>ul").on("click", "li", function(event) {
			var book = $(this).data("book");
			$("#books>ul li").removeClass("selected");
			$(this).addClass("selected");
			var newBook = drawUI.editedBooks(book);
			$("#edit-books>ul li:not(:first)").remove();
			$("#edit-books>ul").append(newBook);
			$("#edit-books").show();
			$("#tags").hide();
		}).on("click", "input", function(event) {
			event.stopPropagation();
		});
		$("#books>ul").on("click", "input[value='Delete']", function() {
			var parent = $(this).parent();
			deleteBookFromBase(parent);
			var id = parent.data("book").objectId;
			$("#edit-books>ul li").each(function() {
				if (id == $(this).data("id")) {
					$(this).remove();
				};
			})
		});
		$("#edit-books>ul").on("click", "input[value='Edit tags']", function() {
			var parent = $(this).parent();
			var book = parent.data("book");
			var title = parent.find(".title").val();
			if (title == "") {
				drawUI.errorMessage("Cannot edit empty book's title.");
			} else {
				tags.loadTagsBooks(book);
				$("#tags").show();
				drawUI.successMessage('Now you can add/edit/delete tags fo "' + title + '".');
			};
		});
		$("#edit-books>ul").on("click", "input[value='Remove']", function() {
			var parent = $(this).parent();
			var title = parent.find(".title").val();
			drawUI.successMessage('Title "' + title + '" successfully removed from edit form.');
			parent.remove();
			$("#tags").hide();
			if ($("#edit-books>ul>li").length == 1) {
				$("#edit-books").hide();
			};
		});
		tags.onClickTag();
		tags.onClickAddBtn(headers, url);
		tags.onClickEditBtn(headers, url);
		tags.onClickDeleteBtn(headers, url);
		tags.onClickRemoveBtn();
	});

}(jQuery))