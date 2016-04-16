angular.module('libraryApp')
       .controller('BooksIndexController', BooksIndexController);

var endpoint = "https://super-crud.herokuapp.com/books";

BooksIndexController.$inject=['$http'];

function BooksIndexController( $http ) {
  var vm = this;
  vm.newBook = {};

  $http({
    method: 'GET',
    url: endpoint,
  }).then(function successCallback(response) {
    console.log("Here's all the books: ", response.data.books);
    vm.books = response.data.books;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.createBook = function () {
    $http({
      method: 'POST',
      url: endpoint,
      data: vm.newBook,
    }).then(function onBookPostSuccess(response) {
      console.log("the new book posted is: ", response.data);
      vm.books.push(response.data);
       //this is working already do not touch! posts and refreshes on its own! : )
    }, function onBookPostError(error) {
     console.log("There was an error in posting the book", response);
   });
  };

  vm.deleteBook = function(book) {
    $http({
      method: 'DELETE',
      url: 'https://super-crud.herokuapp.com/books/' + book._id,
    }).then(function successCallback(json) {
      console.log("the book deleted is: ", book._id);
      var index = vm.books.indexOf(book);
      vm.books.splice(index,1);
      //this is ok already do not touch! able to detect id, delete, refreshes on its own! : )
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response.data);
    });
  };
}
