/**!
 * groupFilters
 * @author jianglj
 * @create 2016-04-27 20:15
 */
(function() {
    'use strict';
  //数组按groupSizes分组
    angular
        .module('xcore.biz.filter')
        .filter('group', function(){
            return function(items, groupSize) {
                var groups = [],
                    inner;
                for(var i = 0; i < items.length; i++) {
                    if(i % groupSize === 0) {
                        inner = [];
                        groups.push(inner);
                    }
                    inner.push(items[i]);
                }
                return groups;
            };
        });
})();
