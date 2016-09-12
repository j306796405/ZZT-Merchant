/***
 * 订单列表查询页面控制器
 * @author xiaodong.liu
 * @date 2016-04-25
 */
(function () {
    'use strict';

    angular
        .module('xcore.biz.order')
        .controller('order.list.MainController', MainController);

    MainController.$inject = [
        '$timeout',
        '$state',
        '$scope',
        'comp.notification.notificationService',
        'comp.session.sessionService'
    ];
    function MainController($timeout, $state, $scope, notificationService, sessionService) {
        init();

        function init() {
            //$state.go('photos.detail')
            //$state.go('^')到上一级,比如从photo.detail到photo
            //$state.go('^.list')到相邻state,比如从photo.detail到photo.list
            //$state.go('^.detail.comment')到孙子级state，比如从photo.detail到photo.detial.comment
            $state.go('xcore.order_list.list');
        }


    }

})
();
