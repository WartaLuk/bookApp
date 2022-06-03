{
  'use strict';
  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      bookImg: '.book__image',
      filters: '.filters'
    }
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };

  class BooksList {
    constructor() {
      this.initData();
      this.render();
      this.initActions();
      this.hideBooks();
    }

    initData() {
      this.data = dataSource.books;
    }
    render() {
      for (const book of this.data) {
        const HTMLData = {
          name: book.name,
          price: book.price,
          rating: book.rating,
          image: book.image,
          id: book.id,
          ratingWidth: book.rating * 10,
          ratingBgc: this.setBarColor(book.rating)
        };

   
        const generatedHTML = templates.templateBook(HTMLData);
        const bookElem = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector(select.containerOf.booksList);
        bookContainer.appendChild(bookElem);
      }
    }

    initActions() {
      this.filters = [];
      const favoriteBooks = [];

      document.querySelector(select.containerOf.booksList).addEventListener('dblclick', function (element) {
        element.preventDefault();
        console.log(element.target.offsetParent);
        if(element.target.offsetParent.classList.contains('book__image')) {

          const bookId = element.target.offsetParent.getAttribute('data-id');
          element.target.offsetParent.classList.toggle('favorite');

          if (!(favoriteBooks.includes(bookId))) {
            favoriteBooks.push(bookId);
          }
          else {
            const bookIndex = favoriteBooks.indexOf(bookId);
            favoriteBooks.splice(bookIndex, 1);
          }
        }
      });

      document.querySelector(select.containerOf.filters).addEventListener('click', (element) => {
        if (element.target.tagName == 'INPUT' && element.target.type == 'checkbox' && element.target.name == 'filter') {
          console.log('this', this);
          if (element.target.checked) {
            console.log('this.filters', this.filters);
            this.filters.push(element.target.value);
          }
          else {
            const index = this.filters.indexOf(element.target.value);
            this.filters.splice(index, 1);
          }
        }
        this.hideBooks();
      });
    }
    hideBooks() {
      for (const book of this.data) {
        if (book.details.adults == true && this.filters.includes('adults')) {
          if (document.querySelector(select.containerOf.bookImg).getAttribute('data-id') == book.id) {
            document.querySelector(`[data-id="${book.id}"]`).classList.add('hidden');
          }
        } else if (book.details.adults == true && !this.filters.includes('adults')) {
          document.querySelector(`[data-id="${book.id}"]`).classList.remove('hidden');
        }
        let arr = [];
        if (book.details.nonFiction == true && this.filters.includes('nonFiction')) {
          arr.push(book.id);
          for (let one of arr) {
            document.querySelector(`[data-id="${one}"]`).classList.add('hidden');
          }
        } else if (book.details.nonFiction == true && !this.filters.includes('nonFiction')) {
          arr.push(book.id);
          for (let one of arr) {
            document.querySelector(`[data-id="${one}"]`).classList.remove('hidden');
          }
        }
      }
    }
    setBarColor(rating) {

      if (rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }
      
      if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }
      
      if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } 
      
      if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
  }
  new BooksList();
}