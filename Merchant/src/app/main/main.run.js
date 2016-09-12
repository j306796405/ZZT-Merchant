(function() {
  'use strict';

  angular
    .module('xcore.main')
    .run(runBlock);


  runBlock.$inject = [
    '$log',
    '$http',
    '$window',
    '$state',
    '$rootScope',
    'comp.session.sessionService',
    'comp.auth.authorityService',
    '$injector'
  ];
  function runBlock(
    $log,
    $http,
    $window,
    $state,
    $rootScope,
    sessionService,
    authorityService,
    $injector) {

    // register the listener for checking the session when first entering index.html
    var unbindStateChangeStart = $rootScope.$on('$stateChangeStart', function(e, toState) {
      if (!$rootScope.session) {
        sessionService.syncSession().then(function(session) {
          unbindStateChangeStart();
          $rootScope.session = session;

        }, function(errMsg) {
          $log.warn(errMsg);
          $window.location.href = 'login.html';
        });
      }
    });



  }




})();
