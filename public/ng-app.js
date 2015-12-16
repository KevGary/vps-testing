var app = angular.module('app', ['ngRoute']);

app.constant('API_URL', 'http://104.236.244.235:3000');
app.constant('DB_URL', 'http://159.203.102.106:3001');


app.controller('GlobalController', function ($scope, DockerFactory, DBFactory) {
  $scope.message = 'douche';
  for(var i = 0; i < 7; i++) {
    DockerFactory.dockerPost('function foo(){return 5*5*5;}') 
      .then(function success(response) {
        $scope.resultData = response.data;
        console.log(response.data);
      })
  }
  // DBFactory.dbGet()
  //   .then(function success(response) {
  //     console.log(response.data)
  //     $scope.usersData[i] = response.data;
  //   })
})

app.factory('DockerFactory', function Docker($q, $http, API_URL) {
  return {
    dockerPost: dockerPost
  }
  function dockerPost(editorValue) {
    return $http.post(API_URL + '/docker', {"data": editorValue});
  }
});

app.factory('DBFactory', function DB($q, $http, DB_URL) {
  return {
    dbGet: dbGet
  }
  function dbGet() {
    return $http.get(DB_URL + '/users');
  }
})