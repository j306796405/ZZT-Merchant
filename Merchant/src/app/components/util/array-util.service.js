/**!
 * array-util.service
 * @author jianglj
 * @create 2016-04-19 18:29
 */
(function() {
    'use stricts';

    angular
        .module('xcore.comp')
        .factory('comp.util.arrayUtil', arrayUtil);

    function arrayUtil() {
        return {

            groupArray: groupArray,
            formatToMulitSelect: formatToMulitSelect

        }

        function groupArray(arr, num) {
            var newArray = [];
            $.each(arr, function(i, v){
                if(i % num === 0){
                    newArray.push([]);
                }
                newArray[newArray.length - 1].push(v);
            })
            return newArray;
        }

        function formatToMulitSelect(arr){
            $.each(arr, function(i, o){
                if(o.code){
                    o.value = o.code;
                    delete o.code;
                }
                if(o.name){
                    o.text = o.name;
                    delete o.name;
                }
            })
            return arr;
        }
    }

})();
