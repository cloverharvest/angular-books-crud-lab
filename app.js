angular
  .module('libraryApp', ['ngRoute'])
  .config(config);

////////////
// ROUTES //
////////////

config.$inject = ['$routeProvider', '$locationProvider'];
function config (  $routeProvider,   $locationProvider  ) {
  $routeProvider
    .when('/', {
      templateUrl: '/templates/books/index.html',
      controller:  'BooksIndexController', //need to define this somewhere
      controllerAs: 'booksIndexCtrl'
    })
    .when('/:id', {
      templateUrl: '/templates/books/show.html',
      controllerAs: 'BooksShowController',
      controller: 'booksShowCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
  });
}
