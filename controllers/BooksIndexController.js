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
    console.log(response);
    vm.books = response.data.books;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.createBook = function () {
    $http({
      method: 'POST',
      url: endpoint,
      data: vm.newBook,
    }).then(function successCallback(response) {
     vm.books.push(response.data.books); //this is working but needs to be manually refreshed
   });

  //  vm.deleteBook = function(book) {
  //   $http({
  //     method: 'DELETE',
  //     url: endpoint + "/" + book._id,
  //   }).then(function successCallback(json) {
  //     console.log("deleted book");
  //   }, function errorCallback(response) {
  //     console.log('There was an error deleting the data', response);
  //   });
  // };
  };
}
