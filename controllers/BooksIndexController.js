angular.module('libraryApp')
       .controller('BooksIndexController', BooksIndexController);

var endpoint = "https://super-crud.herokuapp.com/books";

// in charge of index.html template
BooksIndexController.$inject=['$http'];

function BooksIndexController( $http ) {
  var vm = this;
  vm.newBook = {};

//gets all books
  $http({
    method: 'GET',
    url: endpoint,
  }).then(function successCallback(response) {
    vm.books = response.data.books;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  //creates a book
  vm.createBook = function () {
    $http({
      method: 'POST',
      url: endpoint,
      data: vm.newBook,
    }).then(function onBookPostSuccess(response) {

      vm.books.push(response.data);
       //posts and refreshes on its own! : )
    }, function onBookPostError(error) {
     console.log("There was an error in posting the book", response);
   });
  };

  //deletes a book
  vm.deleteBook = function(book) {
    $http({
      method: 'DELETE',
      url: 'https://super-crud.herokuapp.com/books/' + book._id,
    }).then(function successCallback(json) {
      console.log("the book deleted is: ", book._id);
      var index = vm.books.indexOf(book);
      vm.books.splice(index,1);
      //Able to detect id, delete, refreshes on its own! : )
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response.data);
    });
  };
}
