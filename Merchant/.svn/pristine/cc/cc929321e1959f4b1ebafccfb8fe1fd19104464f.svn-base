(function () {
    'use strict';

    angular
        .module('xcore.biz.info')
        .controller('info.modifypwd.MainController', MainController);

    MainController.$inject = [
        '$timeout',
        '$state',
        '$scope',
        'comp.notification.notificationService',
        'comp.session.sessionService'
    ];
    function MainController($timeout, $state, $scope, notificationService, sessionService) {

        $scope.pwd = {
            originPassword: '888888',
            newPassword: '111111',
            retypeNewPassword: '111111'
        };
        var pwd=$scope.pwd;
        $scope.reset=function(){
            $scope.pwd = {
                originPassword: '',
                newPassword: '',
                retypeNewPassword: ''
            };
        };
        $scope.modifyPassword = modifyPasswordFunc;
        function modifyPasswordFunc() {
            /* $scope.passwordModifyForm.validate();
             if (!$scope.passwordModifyForm.isValid()) {
             return;
             }*/

            if (pwd.newPassword != pwd.retypeNewPassword) {
                notificationService.notify('异常', '新密码两次不一致');
                return;
            }

            sessionService.modifyCredential(
                pwd.originPassword,
                pwd.newPassword
            ).then(
                function () {
                    notificationService.notify('成功', '修改密码成功');
                    //$('#modifyPasswordDialog').modal('hide');
        },
                function (errMessage) {
                    notificationService.notify('失败', errMessage);
                }
            );

        }

    }

})();
