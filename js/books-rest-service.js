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
					var book = drawUI.books(data.results[item]);
					$("#books > ul").append(book);
				}
			}, 
			function() {
				drawUI.errorMessage("load books");
			}
		);
	}

	function editBookToBase(parent) {
		var id = parent.data("book").objectId;
		var oldTitle = parent.data("book").title;
		var title = $(".selected > .title").val();
		var author = $(".selected > .author").val();
		var isbn = $(".selected > .isbn").val();
		ajaxRequester.put(
			headers, 
			(url + id), 
			{
				"title" : title,
				"author" : author,
				"isbn" : isbn
			}, 
			function() {
				drawUI.successMessage('Title "' + oldTitle + '" successfully edit to data base.');
				parent.removeClass();
			},
			function() {
				drawUI.errorMessage('edit "' + oldTitle + '"');
				parent.removeClass();
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
				drawUI.errorMessage("delete " + title);
			}
		);
	}

	function addBooksToBase() {
		$("#new-book>ul li:not(:first)").each(function(){
			if ($(this).first().find(".title").val() == "" || $(this).data("book") == undefined) {
				drawUI.errorMessage('post empty title or not add/edit book');
				return;
			};
			var obj = {};
			obj["title"] = $(this).data("book").getTitle();
			obj["author"] = $(this).data("book").getAuthor();
			obj["isbn"] = $(this).data("book").getIsbn();
			ajaxRequester.post(
				headers, 
				url,
				obj,
				function() {
					drawUI.successMessage('Title "' + obj["title"] + '"" successfully added to data base.');
				},
				function() {
					drawUI.errorMessage('post "' + obj["title"] + '" to data base');
				}
			);
		});
	}

	function createEditNewBook(addBtn) {
		var parent = $(addBtn).parent();
		var title = $(".create > .title").val();
		var author = $(".create > .author").val();
		var isbn = $(".create > .isbn").val();
		var book = new Book(title, author, isbn);
		parent.data("book", book);
	}

	function deleteCreatedNewBook(addBtn) {
		var parent = $(addBtn).parent();
			parent.remove();
		/*if (addBtn.hasOwnProperty("_title")) {
			var parent = $(addBtn).parent();
			parent.remove();
		} else {
			$("#new-book>ul li:not(:first)").remove();
		};*/
	}

	$(document).ready(function () {
		$("#get-books").on("click", function() {
			$("#books > ul li:not(:first)").remove();
			loadBooksFromBase(); 
		});
		$("#create-book").on("click", function() {
			$("#new-book").show();
			var newBook = drawUI.newBook();
			$("#new-book>ul").append(newBook);
		});
		$("#add-book").on("click", function() {
			addBooksToBase();
			$("#new-book>ul li:not(:first)").remove();
			$("#new-book").hide();
		});
		$("#books>ul").on("click", "input[type='text']", function() {
			$("#books>ul li").removeClass("selected");
			$(this).parent().addClass("selected");
		});
		$("#books>ul").on("click", "input[value='Delete']", function() {
			var parent = $(this).parent();
			deleteBookFromBase(parent);
		});
		$("#books>ul").on("click", "input[value='Edit']", function() {
			var parent = $(this).parent();
			editBookToBase(parent);
		});
		$("#new-book>ul").on("click", "input[value='Add/Edit']", function() {
			$("#new-book>ul li").removeClass(".create");
			var parent = $(this).parent();
			var title = $(this).parent().find(".title").val();
			if (title == "") {
				drawUI.errorMessage('add/edit empty title');
			} else {
				parent.addClass("create");
				createEditNewBook($(this));
				drawUI.successMessage('Title "' + title + '" successfully edit.Click POST Books button.');
			};
		});
		$("#new-book>ul").on("click", "input[value='Delete']", function() {
			var title = $(this).parent().find(".title").val();
			drawUI.successMessage('Title "' + title + '" successfully removed.');
			deleteCreatedNewBook($(this));
		});
	});

}(jQuery))