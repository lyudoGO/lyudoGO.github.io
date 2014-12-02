var drawUI = (function () {

	function books(book) {
		var bookTag = $('<li>');
		$(bookTag).data("book", book);
		var titleTag = $('<input type="text" class="title">').val(book.title);
		var authorTag = $('<input type="text" class="author">').val(book.author);
		var isbnTag = $('<input type="text" class="isbn">').val(book.isbn);
		var editBtn = $('<input type="button" value="Edit">');
		var delBtn = $('<input type="button" value="Delete">');
		bookTag.append(titleTag, authorTag, isbnTag, editBtn, delBtn);

		return bookTag;
	}

	function newBook() {
		var bookTag = $('<li>');
		var titleTag = $('<input type="text" class="title">');
		var authorTag = $('<input type="text" class="author">');
		var isbnTag = $('<input type="text" class="isbn">');
		var addBtn = $('<input type="button" value="Add/Edit">');
		var delBtn = $('<input type="button" value="Delete">');
		bookTag.append(titleTag, authorTag, isbnTag, addBtn, delBtn);

		return bookTag;
	}

	function errorMessage(message) {
		$('#message').css("background-color", "red").show();
		$('<p class="error">').text('Cannot ' + message + '.No access.')
							  .appendTo('#message')
							  .fadeOut(7000, function() {
							  	$('.error').remove();
							  	$('#message').hide();
							  });
	}

	function successMessage(message) {
		$('#message').css("background-color", "green").show();
		$('<p class="success">').text(message)
							  .appendTo('#message')
							  .fadeOut(7000, function() {
							  	$('.success').remove();
							  	$('#message').hide();
							  });
	}

	return {
		books: books,
		newBook: newBook,
		errorMessage: errorMessage,
		successMessage: successMessage
	}
}());