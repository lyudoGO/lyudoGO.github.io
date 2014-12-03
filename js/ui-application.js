var drawUI = (function () {

	function loadedBooks(book) {
		var bookTag = $('<li>');
		$(bookTag).data("book", book);
		var titleTag = $('<span class="title">').text(book.title);
		var authorTag = $('<span class="author">').text(book.author);
		var isbnTag = $('<span class="isbn">').text(book.isbn);
		var delBtn = $('<input type="button" value="Delete">');
		var tagsTag = $('<p class="book-tags">');
		if (book.tags) {
			var tags = book.tags.join(", ");
			tagsTag.append("tags: " + tags);
		};
		bookTag.append(titleTag, authorTag, isbnTag, delBtn, tagsTag);

		return bookTag;
	}

	function createdBooks() {
		var bookTag = $('<li>');
		var titleTag = $('<input type="text" class="title">');
		var authorTag = $('<input type="text" class="author">');
		var isbnTag = $('<input type="text" class="isbn">');
		var tagsTag = $('<input type="text" class="tags" placeholder="Enter tags separated with comma">');
		bookTag.append(titleTag, authorTag, isbnTag, tagsTag);

		return bookTag;
	}

	function editedBooks(book) {
		var bookTag = $('<li>');
		$(bookTag).data("book", book);
		var titleTag = $('<input type="text" class="title">').val(book.title);
		var authorTag = $('<input type="text" class="author">').val(book.author);
		var isbnTag = $('<input type="text" class="isbn">').val(book.isbn);
		var editBtn = $('<input type="button" value="Edit tags">');
		var removeBtn = $('<input type="button" value="Remove">');
		bookTag.append(titleTag, authorTag, isbnTag, editBtn, removeBtn);

		return bookTag;
	}

	function tagsBooks(book) {
		var tagsTag = $('<ul>');
		var tags = book.tags;
		for (var i = 0; i < tags.length; i++) {
			tagsTag.append($('<li>').text(tags[i]));
		};

		return tagsTag;
	}
	
	function errorMessage(message) {
		$('#error').css("background-color", "red").show();
		$('<p class="error">').text(message)
							  .appendTo('#error')
							  .fadeOut(7000, function() {
							  	$('.error').remove();
							  	$('#error').hide();
							  });
	}

	function successMessage(message) {
		$('#success').css("background-color", "green").show();
		$('<p class="success">').text(message)
							  .appendTo('#success')
							  .fadeOut(7000, function() {
							  	$('.success').remove();
							  	$('#success').hide();
							  });
	}

	return {
		loadedBooks: loadedBooks,
		editedBooks: editedBooks,
		createdBooks: createdBooks,
		tagsBooks: tagsBooks,
		errorMessage: errorMessage,
		successMessage: successMessage
	}
}());