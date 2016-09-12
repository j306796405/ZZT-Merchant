/***
 * 订单列表查询页面控制器
 * @author xiaodong.liu
 * @date 2016-04-25
 */
(function () {
  'use strict';

  angular
    .module('xcore.biz.order')
    .controller('order.list.ListController', ListController);

  ListController.$inject = [
    '$timeout',
    '$q',
    '$controller',
    '$state',
    '$scope',
    'order.list.listService',
    'comp.notification.notificationService',
    'comp.session.sessionService'
  ];
  function ListController($timeout, $q,$controller,$state, $scope, listService,notificationService, sessionService) {
    var vm = this;
    $scope.filter = {
      startTime: '',
      endTime: '',
      warehouse: '',
      name: '',
    };
    $scope.reset = function () {
      $scope.filter = {
        startTime: '',
        endTime: '',
        warehouse: '',
        name: '',
      };
    };
    $scope.panes = [{
      title: '全部',
      total: '',
      value: ''
    }, {
      title: '待发货',
      total: '',
      value: '4'
    },{
      title: '已发货',
      total: '',
      value: '2'
    }, {
      title: '已完成',
      total: '',
      value: '3'
    }, {
      title: '已关闭',
      total: '',
      value: '9'
    }];

    $scope.query = queryFunc;
    $controller('comp.ext.controller.PaginationDataGridController', {$scope: $scope});
    /** 实现 PaginationDataGridController 的抽象方法 */
    $scope.getCollection = queryFunc;

    $scope.changeStates=changeStatesFunc;
    function queryFunc() {
      var qc = $scope.filter;
      return  listService.queryList({
          beginTime: qc.startTime,
          endTime: qc.endTime,
          isWarehouse: qc.warehouse,
          soCode :qc.soCode,
          sState: qc.state
        }
      ).then(
        function (response) {
          $scope.data = response.data;
          return {
            total_count: response.headers['x-total-count'],
            collection: response.data
          };
        },
        function (errMsg) {
          return $q.reject(errMsg);
        }
      );
    }

    /**
     * tab 切换
     * @param value
     */
    function changeStatesFunc(value) {
      if (typeof(value) != "undefined") {
        $scope.filter.state = value;
        $scope.listData();
      }
    }
    $scope.goToOrderDetail = goToOrderDetailFunc;
    /***
     * 跳转到订单详情页面
     */
    function goToOrderDetailFunc(soCode) {
      $state.go('xcore.order_list.detail',{soCode : soCode});
    }

    $scope.queryDetail = queryDetailFunc;
    /***
     * 查询订单详情
     */
    function queryDetailFunc() {

    }


  }

})
();
