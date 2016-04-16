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
    }).then(function onBookDeleteSuccess(json) {
      console.log("the book to be deleted is: ", book._id);
      //on success, this deletes the book and returns the user to the home page
      $location.path('/');
      //working already, do not touch but ux could be improved
    }, function errorBookDeleteError(response) {
      console.log('There was an error deleting the data', response.data);
    });
  };

  vm.editBook = function (booktoEdit) {
    console.log("the book to be edited is: ", booktoEdit);
    $http({
      method: 'PUT',
      url: 'https://super-crud.herokuapp.com/books/' + booktoEdit._id,
      data: {
        image: booktoEdit.image,
        title: booktoEdit.title,
        author: booktoEdit.author,
        releaseDate: booktoEdit.releaseDate
      }
    }).then(function onBookEditSuccess(response) {
      console.log("the book edited is: ", bookId, ":", response.data);

      vm.book = response.data;
      $location.path('/');
      //this is already working do not touch
    }, function onBookEditError(response) {
      console.log('There was an error editing the data', response);
    });
  };

}
