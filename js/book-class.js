var Book = (function () {
	function Book(title, author, isbn) {
		this.setTitle(title);
		this.setAuthor(author);
		this.setIsbn(isbn);
	}

	Book.prototype = {
		getTitle: function () {
			return this._title;
		},
		setTitle: function (title) {
			this._title = title;
		},
		getAuthor: function () {
			return this._author;
		},
		setAuthor: function (author) {
			this._author = author;
		},
		getIsbn: function () {
			return this._isbn;
		},
		setIsbn: function (isbn) {
			this._isbn = isbn;
		}
	}

	return Book;

}());