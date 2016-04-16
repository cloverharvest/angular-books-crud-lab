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
    console.log(response.data);
    vm.book = response.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', error);
  });
}
