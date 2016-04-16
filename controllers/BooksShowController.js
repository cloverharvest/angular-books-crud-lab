angular
 .module('libraryApp')
 .controller('BooksShowController', BooksShowController);

var endpoint = "https://super-crud.herokuapp.com/books/";

BooksShowController.$inject=['$http', '$routeParams', '$location'];

function BooksShowController($http, $routeParams, $location) {
  var vm = this;
  var bookId = $routeParams.id;

  $http({
    method: 'GET',
    url: endpoint + bookId,
  }).then(function successCallback(response) {
    console.log("this is the book that was clicked: ", response.data);
    vm.book = response.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', error);
  });

  vm.deleteBook = function(book) {
    $http({
      method: 'DELETE',
      url: 'https://super-crud.herokuapp.com/books/' + book._id,
    }).then(function successCallback(json) {
      console.log("the book to be deleted is: ", book._id);
      //this deletes the book and returns the user to the home page
      $location.path('/');
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response.data);
    });
  };
}
