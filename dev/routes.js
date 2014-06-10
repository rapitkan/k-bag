module.exports = ['$routeProvider', '$locationProvider',  
  function($routeProvider, $locationProvider) {
    $routeProvider.when('/view1', {
      templateUrl: './views/view1.html', 
      controller: 'MyCtrl1'
    }).when('/view2', { 
      templateUrl: './views/view1.html', 
      controller: 'MyCtrl2'
    }).otherwise({redirectTo: 'http://www.google.fi'});

    $locationProvider.html5Mode(false);
  }
];