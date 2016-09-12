/**!
 * compactFilter
 * @author jianglj
 * @create 2016-05-25 15:05
 */
(function() {
    'use strict';
    angular
        .module('xcore.biz.filter')
        .filter('compact', compact)

    //过滤 false, null, undefined
    function compact(){
        return function(arr){
            return _.compact(arr);
        }
    }
})();