/***
 * 订单-订单列表路由配置
 */
(function() {
  'use strict';

  angular
    .module('xcore.biz.order')
    .config(routerConfig);

  routerConfig.$inject = [
    '$stateProvider'
  ];
  function routerConfig($stateProvider) {

    var basePath = 'app/business/order/list/';
    var baseState = 'xcore.order_list.';
    var basePackage = 'order.list.';

    $stateProvider
      .state(baseState + 'detail', {
        templateUrl: basePath + 'view/detail.html',
        controller: basePackage + 'DetailController',
        controllerAs: "orderDetailCtrl",
        params: {
          soCode:''
        }
      }).state(baseState + 'list', {
      templateUrl: basePath + 'view/list.html',
      controller: basePackage + 'ListController',
      controllerAs: "orderlistCtrl"
    })
  }

})();
