var tags = (function() {
	function loadTagsBooks(book) {
		$("#tags ul, #tags p").remove();
		$("#tags>h4").text("");
		$("#tags .add-tag").val("");
		$("#tags").data("book", book);
		$("#tags>h4").text(book.title);
		if (book.tags === undefined || book.tags.length === 0) {
			$("#tags>h4").after($("<p class='no-tags'>This book no tags</p>"));
		} else {
			var bookTags = drawUI.tagsBooks(book);
			$("#tags>h4").after(bookTags);
		};
	}

	function onClickTag() {
		$("#tags").on("click", "li", function() {
			$("#tags li").removeClass("get-tag");
			var tagText = $(this).addClass("get-tag").text();
			$(".add-tag").val(tagText);
		});
	}

	function onClickAddBtn(headers, url) {
		$("#tags").on("click", "input[value='Add']", function() {
			var book = $("#tags").data("book");
			var newTagText = $(".add-tag").val();
			if (!newTagText) {
				$("#tags>h4").after($("<p class='no-tags'>Cannot add empty tag</p>"));
				$("#tags .no-tags").fadeOut(2000);
				return;
			};
			updateTagToBase("Add", book, newTagText, headers, url);
			$("#tags .no-tags").remove();
			$("#tags .add-tag").val("");
		})
	}

	function onClickEditBtn(headers, url) {
		$("#tags").on("click", "input[value='Edit']", function() {
			var book = $("#tags").data("book");
			var oldTagText = $(".get-tag").text();
			var newTagText = $(".add-tag").val();
			if (!newTagText) {
				$("#tags>h4").after($("<p class='no-tags'>Cannot edit empty</p>"));
				$("#tags .no-tags").fadeOut(2000);
				return;
			};
			if (!oldTagText) {
				$("#tags>h4").after($("<p class='no-tags'>You must select tag</p>"));
				$("#tags .no-tags").fadeOut(2000);
				return;
			};
			var tagsArr = book.tags;
			var index = tagsArr.indexOf(oldTagText);
			tagsArr.splice(index, 1, newTagText);
			editTagToBase("Delete", book, null, headers, url);
			editTagToBase("Add", book, tagsArr, headers, url);
			
		})
	}
	function onClickDeleteBtn(headers, url) {
		$("#tags").on("click", "input[value='Delete']", function() {
			var book = $("#tags").data("book");
			var newTagText = $(".get-tag").text();
			if (!newTagText) {
				$("#tags>h4").after($("<p class='no-tags'>Cannot delete empty tag</p>"));
				$("#tags .no-tags").fadeOut(2000);
				return;
			};
			updateTagToBase("Remove", book, newTagText, headers, url);
			$("#tags .add-tag").val("");
		})
	}

	function onClickRemoveBtn() {
		$("#tags").on("click", "input[value='Remove']", function() {
			$("#tags").hide();
		});
	}

	function updateTagToBase(method, book, newTagText, headers, url) {
		var obj = {"tags":{"__op": method, "objects":[newTagText]}};
		ajaxRequester.put(
				headers, 
				(url + book.objectId),
				obj,
				function() {
					drawUI.successMessage('Tag "' + newTagText + '"" successfully ' + method + ' to data base.');
					if (method === "Remove") {
						$("#tags .get-tag").remove();
					}
					if (method === "Add") {
						$("#tags ul").append($("<li>").text(newTagText))
					};
				},
				function() {
					drawUI.errorMessage(method + ' "' + newTagText + '" to data base');
				}
			);
	}

	function editTagToBase(method, book, newTagText, headers, url) {
		var obj = {"tags":{"__op": method, "objects": newTagText}};
		ajaxRequester.put(
				headers, 
				(url + book.objectId),
				obj,
				function() {
					drawUI.successMessage('Tag successfully edit to data base.');
					$("#tags .get-tag").text($("#tags .add-tag").val());
					$("#tags .add-tag").val("");
				},
				function() {
					drawUI.errorMessage("Cannot edit tag to data base");
					$("#tags .add-tag").val("");
				}
			);
	}

	return {
		loadTagsBooks: loadTagsBooks,
		onClickTag: onClickTag,
		onClickAddBtn: onClickAddBtn,
		onClickEditBtn: onClickEditBtn,
		onClickDeleteBtn: onClickDeleteBtn,
		onClickRemoveBtn: onClickRemoveBtn
	}
}());