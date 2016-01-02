var app = angular.module('StarterApp', ['ngMaterial', 'ngMdIcons']);

app.controller('AppToastCtrl', function($scope, $mdToast, $document) {

  $scope.showCustomToast = function(msg, type) {
    $mdToast.show({
      controller: 'ToastCtrl',
      template: '<md-toast style="position:fixed; margin-top:50px;" class="'+ type +'"> <span flex> '+ msg +' </span> <md-button ng-click="closeToast()"> Close </md-button></md-toast>',
      parent : $document[0].querySelector('#toastBounds'),
      hideDelay: 2000,
      position: 'top right'
    });
  };

})
app.controller('ToastCtrl', function($scope, $mdToast) {
  $scope.closeToast = function() {
    $mdToast.hide();
  };
});

app.controller('AppCtrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog){

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  $scope.menu = menu
  $scope.admin = admin
  $scope.students = students
  $scope.alert = '';
  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: '/static/templates/bottom_sheet.html',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };

  $scope.showAdd = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '/static/templates/add_student.html',
      targetEvent: ev,
    })
    .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };
}]);

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
};

app.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Share', icon: 'share' },
    { name: 'Upload', icon: 'cloud_upload' },
    { name: 'Copy', icon: 'content_copy' },
    { name: 'Print', icon: 'print' },
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
});



app.directive('userAvatar', function() {
  return {
    replace: true,
    template: '<svg class="user-avatar" viewBox="0 0 128 128" height="64" width="64" pointer-events="none" display="block" > <path fill="#FF8A80" d="M0 0h128v128H0z"/>   </svg>'
  };
});


app.config(function($mdThemingProvider) {
// Extend the red theme with a few different colors
var neonRedMap = $mdThemingProvider.extendPalette('deep-purple', {
'500': '110931',
'600': '7f1e52'
});
// Register the new color palette map with the name <code>neonRed</code>
$mdThemingProvider.definePalette('neonRed', neonRedMap);
// Use that theme for the primary intentions
$mdThemingProvider.theme('default')
.primaryPalette('neonRed')
});
