(function() {
  'use strict';

  angular
    .module('xcore.biz.order')
    .factory('order.list.listService', ListService);

  ListService.$inject = [
    '$log',
    '$q',
    'comp.rest.restAccessor'
  ];
  function ListService($log, $q, restAccessor) {

    return {

      queryList: queryList,
      deliveryOrder: deliveryOrder,
      goToOrderDetail: goToOrderDetail

    };

    /**
     * 查询订单列表
     *
     * @param filterParam
     * @returns {Promise}
     *  resolve: {total_count: 13, collections: [{...}]}
     *  reject: message
     */
    function queryList(filterParam) {
      return restAccessor.get('/merchant/order/query', null, filterParam).then(
        function(response) {
          return response;
        },
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }

    /**
     * 发货
     *
     */
    function deliveryOrder(orderId) {
      return restAccessor.get('/system/domains/:orderId', {orderId: orderId}).then(
        function(response) {
          return response.data;
        },
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }

    /**
     * 跳转到订单详情页面
     *
     */
    function goToOrderDetail(orderId) {
      return restAccessor.get('/merchant/order/detail', null, {soCode: orderId}).then(
        function(response) {
          return response;
        },
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }



  }

})();
