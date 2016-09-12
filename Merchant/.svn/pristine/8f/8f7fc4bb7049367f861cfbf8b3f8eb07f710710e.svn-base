/***
 * 订单列表查询页面控制器
 * @author xiaodong.liu
 * @date 2016-04-25
 */
(function () {
  'use strict';

  angular
    .module('xcore.biz.order')
    .controller('order.list.DetailController', DetailController);

  DetailController.$inject = [
    '$timeout',
    '$q',
    '$stateParams',
    '$state',
    '$scope',
    'ngDialog',
    'order.list.listService',
    'comp.notification.notificationService',
    'comp.session.sessionService'
  ];
  function DetailController($timeout,$q,$stateParams, $state, $scope, ngDialog,listService,notificationService, sessionService) {
    var vm = this;
    $scope.query = queryFunc;
    $scope.data = '';
    function queryFunc() {
      return  listService.goToOrderDetail($stateParams.soCode
      ).then(
        function (response) {
          $scope.data = response.data;
        },
        function (errMsg) {
          return $q.reject(errMsg);
        }
      );
    }
    $scope.query();
    $scope.goToOrderMain = goToOrderMainFunc;
    /***
     * 跳转到订单详情页面
     */
    function goToOrderMainFunc() {
      $state.go('xcore.order_list');
    }

    /***
     *  打开发货框
     * @type {openDeliveryDialogFunc}
     */
    $scope.openDeliveryDialog = openDeliveryDialogFunc;
    function openDeliveryDialogFunc() {
      ngDialog.openConfirm({
        template: 'deliveryDialogId',
        className: 'ngdialog-theme-default'
      }).then(function () {

        console.log("logisticNo="+$("#logisticNo").val()+",delivery="+$("#logisticCompany").val());
      }, function () {

      });
    }


  }

})
();
