/**!
 * main.controller.js
 * @author jianglj
 * @create 2016-04-15 15:20
 */
(function(){

    angular
        .module('xcore.main')
        .controller('main.MainController', MainController);

    MainController.$inject = [
        '$log',
        '$window',
        '$scope',
        '$state',
        'ngDialog',
        'comp.session.sessionService'
    ];

    function MainController($log, $window, $scope, $state, ngDialog, sessionService) {
        var vm = this;
         $scope.quit = quit;
         function quit() {
             ngDialog.openConfirm({
                 template: 'quitDialogId',
                 className: 'ngdialog-theme-default',
             }).then(function () {
                 sessionService.destroySession();
                 $window.location.href = 'login.html';
             }, function () {

             });
         }
    }
})();
