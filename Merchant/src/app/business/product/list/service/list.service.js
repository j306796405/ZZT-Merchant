/**
 * Created by fcy79 on 2016/4/22.
 */
(function() {
    'use strict';

    angular
        .module('xcore.biz.product')
        .factory('product.list.service', listService);

    listService.$inject = [
        '$log',
        '$q',
        'comp.rest.restAccessor'
    ];
    function listService($log, $q, restAccessor) {

        return {
            getProductList: getProductList,
            upAndDownProductApply : upAndDownProductApply,
            cancelApply:cancelApply,
            getCategory :getCategory,
            getBrands:getBrands
        };


        function getProductList(product) {
            return restAccessor.get('/merchant/products/query','',product).then(
                function (response) {
                    return response;
                },
                function (errResponse) {
                    return $q.reject(errResponse.data.message);
                }
            );
        }
        function upAndDownProductApply(apply){
            return restAccessor.post('/merchant/products/apply','',apply).then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    return $q.reject(errResponse.data.message);
                }
            );
        }
        function cancelApply(paId) {
            return restAccessor.patch('/merchant/products/cancel/:paId',{paId:paId},'').then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    return $q.reject(errResponse.data.message);
                }
            )
        }

        function getCategory(saCode) {
            return restAccessor.get('/merchant/categories/:saCode',{saCode:saCode},'').then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    return $q.reject(errResponse.data.message);
                }
            )
        }
        function getBrands(saCode) {
            return restAccessor.get('/merchant/brands/:saCode',{saCode:saCode},'').then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    return $q.reject(errResponse.data.message);
                }
            )
        }
    }
})();